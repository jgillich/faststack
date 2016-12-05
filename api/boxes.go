package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	"code.cloudfoundry.org/bytefmt"

	"golang.org/x/net/websocket"

	"net/url"

	sigar "github.com/cloudfoundry/gosigar"
	"github.com/hyperhq/runv/hypervisor/pod"
	"github.com/labstack/echo"
)

func (a *Api) CreateBox(c echo.Context) error {
	body, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		return err
	}

	var req CreateBoxRequest
	if err = json.Unmarshal(body, &req); err != nil {
		return err
	}

	// validate captcha if secret is configured
	if a.Config.RCSecret != "" {
		data := url.Values{}
		data.Set("secret", a.Config.RCSecret)
		data.Set("response", req.Captcha)
		data.Set("remoteip", c.RealIP())

		res, err := http.PostForm("https://www.google.com/recaptcha/api/siteverify", data)
		if err != nil {
			return err
		}

		defer res.Body.Close()

		var verify CaptchaVerifyResponse
		if err := json.NewDecoder(res.Body).Decode(&verify); err != nil {
			return err
		}
		if !verify.Success {
			return errors.New("Captcha verification failed")
		}
	} else {
		a.Log.Warn("Creating box without captcha verfication")
	}

	// verify image is whitelisted
	imageAllowed := false
	for _, image := range *a.Images {
		if req.Image == image.Image {
			for _, version := range image.Versions {
				if req.Version == version {
					imageAllowed = true
				}
			}
		}
	}
	if !imageAllowed {
		return errors.New("Image not allowed")
	}

	// make sure we are not running out of memory
	mem := sigar.Mem{}
	mem.Get()
	if mem.ActualFree < bytefmt.GIGABYTE {
		return errors.New("Resource limit reached, try again later")
	}

	container := pod.UserContainer{
		Image: fmt.Sprintf("%s:%s", req.Image, req.Version),
	}

	pod := pod.UserPod{
		Name:       "termbox",
		Containers: []pod.UserContainer{container},
		Resource:   pod.UserResource{Vcpu: 1, Memory: 512},
	}

	podID, statusCode, err := a.Hyper.CreatePod(pod)
	if err != nil {
		if statusCode == http.StatusNotFound {
			if err := a.HyperClient.PullImages(&pod); err != nil {
				return err
			}
			podID, statusCode, err = a.Hyper.CreatePod(pod)
			if err != nil {
				return err
			}
		} else {
			return err
		}
	}

	return c.JSON(http.StatusOK, CreateBoxResponse{PodID: podID})
}

type execMessage struct {
	Type    string `json:"type"`
	Message string `json:"message"`
}

func (a *Api) ExecBox(c echo.Context) error {

	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()

		podID := c.Param("id")
		podInfo, err := a.Hyper.GetPodInfo(podID)
		if err != nil {
			a.Log.Debug(err)
			websocket.Message.Send(ws, "box does not exist, closing connection")
			return
		}
		if podInfo.Status.Phase != "Running" {
			_, err := a.Hyper.StartPod(podID, "", false, false, nil, nil, nil)
			if err != nil {
				a.Log.Warn(err)
				return
			}
		}
		containerID, _ := a.Hyper.GetContainerByPod(podID)

		command, err := json.Marshal([]string{"bash"})
		if err != nil {
			a.Log.Error(err)
			return
		}

		execID, err := a.Hyper.CreateExec(containerID, command, true)
		if err != nil {
			a.Log.Warn(err)
			return
		}

		dec := json.NewDecoder(ws)

		r, w := io.Pipe()

		go func() {
			if err := a.Hyper.StartExec(containerID, execID, true, r, ws, ws); err != nil {
				a.Log.Warn(err)
				return
			}
		}()

		for {
			var message ExecBoxMessage
			if err := dec.Decode(&message); err != nil {
				a.Log.Warn(err)
				break
			}

			if message.Width != 0 && message.Height != 0 {
				if err := a.Hyper.WinResize(containerID, execID, message.Height, message.Width); err != nil {
					a.Log.Warn(err)
				}
				continue
			}
			if message.Data != "" {
				_, err = io.WriteString(w, message.Data)
				if err != nil {
					a.Log.Warn(err)
					break
				}
			}
		}

	}).ServeHTTP(c.Response(), c.Request())
	return nil

}

type ExecReader struct {
	data      []byte
	readIndex int64
}
