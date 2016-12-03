package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"

	"golang.org/x/net/websocket"

	"github.com/hyperhq/runv/hypervisor/pod"
	"github.com/labstack/echo"
)

func CreateBox(c echo.Context) error {
	body, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		return err
	}

	var req CreateBoxRequest
	err = json.Unmarshal(body, &req)
	if err != nil {
		return err
	}

	imageAllowed := func() bool {
		for _, image := range Images {
			if req.Image == image.Image {
				for _, version := range image.Versions {
					if req.Version == version {
						return true
					}
				}
			}
		}
		return false
	}

	if !imageAllowed() {
		return errors.New("image not allowed")
	}

	container := pod.UserContainer{
		Image: fmt.Sprintf("%s:%s", req.Image, req.Version),
	}

	pod := pod.UserPod{
		Name:       "termbox-userbox",
		Containers: []pod.UserContainer{container},
		Resource:   pod.UserResource{Vcpu: 1, Memory: 256},
		Tty:        true,
	}

	podID, statusCode, err := Hyper.CreatePod(pod)
	if err != nil {
		if statusCode == http.StatusNotFound {
			err = HyperClient.PullImages(&pod)
			if err != nil {
				return err
			}
			podID, statusCode, err = Hyper.CreatePod(pod)
		}
		if err != nil {
			return err
		}
	}

	return c.JSON(http.StatusOK, CreateBoxResponse{PodID: podID})
}

type execMessage struct {
	Type    string `json:"type"`
	Message string `json:"message"`
}

func ExecBox(c echo.Context) error {

	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()

		podID := c.Param("id")
		podInfo, err := Hyper.GetPodInfo(podID)
		if err != nil {
			Logger.Debug(err)
			websocket.Message.Send(ws, "box does not exist, closing connection")
			return
		}
		if podInfo.Status.Phase != "Running" {
			_, err := Hyper.StartPod(podID, "", false, false, nil, nil, nil)
			if err != nil {
				Logger.Warn(err)
				return
			}
		}
		container, _ := Hyper.GetContainerByPod(podID)

		Logger.Info("CreatExec ", container)

		command, err := json.Marshal([]string{"bash"})
		if err != nil {
			Logger.Error(err)
			return
		}

		execID, err := Hyper.CreateExec(container, command, true)
		if err != nil {
			Logger.Warn(err)
			return
		}

		err = Hyper.StartExec(container, execID, true, ws, ws, ws)
		if err != nil {
			Logger.Warn(err)
			return
		}

	}).ServeHTTP(c.Response(), c.Request())
	return nil

}
