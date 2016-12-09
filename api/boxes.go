package api

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"math/rand"
	"net/http"
	"time"

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
			return c.String(http.StatusBadRequest, "Captcha verification failed")
		}
	} else {
		a.Log.Warn("Creating box without captcha verfication")
	}

	// verify image is whitelisted
	var image Image
	for _, i := range *a.Images {
		if req.Image == i.Image {
			for _, version := range i.Versions {
				if req.Version == version {
					image = i
				}
			}
		}
	}
	if image.Image == "" {
		return c.String(http.StatusBadRequest, "Image not allowed")
	}

	// make sure we are not running out of memory
	mem := sigar.Mem{}
	mem.Get()
	if mem.ActualFree < bytefmt.GIGABYTE {
		return c.String(http.StatusTooManyRequests, "Server capacity reached , please try again later")
	}

	port := pod.UserContainerPort{
		// random port between 10000 and 60000
		HostPort:      10000 + rand.Intn(50000),
		ContainerPort: 2000,
	}

	container := pod.UserContainer{
		Image:   fmt.Sprintf("%s:%s", image.Image, req.Version),
		Command: []string{"sh"},
		Ports:   []pod.UserContainerPort{port},
		Envs: []pod.UserEnvironmentVar{
			pod.UserEnvironmentVar{
				Env:   "PORT",
				Value: "2000",
			},
		},
	}

	pod := pod.UserPod{
		Name:       "termbox",
		Hostname:   image.Name,
		Containers: []pod.UserContainer{container},
		Resource:   pod.UserResource{Vcpu: a.Config.BoxCpus, Memory: a.Config.BoxMemory},
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

	a.Log.Infof("IP Address %v created %v with public port %v", c.RealIP(), podID, port.HostPort)

	return c.JSON(http.StatusOK, CreateBoxResponse{PodID: podID})
}

func (a *Api) ExecBox(c echo.Context) error {

	podID := c.Param("id")
	podInfo, err := a.Hyper.GetPodInfo(podID)
	if err != nil {
		return c.String(http.StatusNotFound, "Box does not exist")
	}

	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()

		if podInfo.Status.Phase != "Running" {
			_, err := a.Hyper.StartPod(podID, "", false, false, nil, nil, nil)
			if err != nil {
				a.Log.Warn(err)
				return
			}
		}
		containerID, _ := a.Hyper.GetContainerByPod(podID)

		command, err := json.Marshal([]string{"sh", "-c", "tmux attach -d 2> /dev/null || tmux"})
		if err != nil {
			a.Log.Error(err)
			return
		}

		execID, err := a.Hyper.CreateExec(containerID, command, true)
		if err != nil {
			a.Log.Error(err)
			return
		}

		dec := json.NewDecoder(ws)

		r, w := io.Pipe()
		defer r.Close()
		defer w.Close()

		go func() {
			if err := a.Hyper.StartExec(containerID, execID, true, r, ws, ws); err != nil {
				a.Log.Error(err)
			}
		}()

		for dec.More() {
			var message ExecBoxMessage
			if err := dec.Decode(&message); err != nil {
				a.Log.Error(err)
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
					a.Log.Error(err)
					break
				}
			}
		}

	}).ServeHTTP(c.Response(), c.Request())
	return nil

}

func (a *Api) GetBox(c echo.Context) error {

	podID := c.Param("id")
	podInfo, err := a.Hyper.GetPodInfo(podID)
	if err != nil {
		return c.String(http.StatusNotFound, "Box does not exist")
	}

	remaining := time.Duration(a.Config.BoxDuration)*time.Hour - time.Since(time.Unix(podInfo.CreatedAt, 0))

	container := podInfo.Spec.Containers[0]

	res := GetBoxResponse{
		Id:            podID,
		TimeRemaining: int(remaining.Seconds()),
		Image:         container.Image,
		Port:          int(container.Ports[0].HostPort),
	}

	return c.JSON(http.StatusOK, res)
}
