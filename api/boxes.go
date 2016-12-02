package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"golang.org/x/net/websocket"

	"github.com/hyperhq/runv/hypervisor/pod"
	"github.com/labstack/echo"
)

var (
	images Images
)

func init() {
	dat, err := ioutil.ReadFile("images/images.json")
	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal([]byte(dat), &images)
	if err != nil {
		log.Fatal(err)
	}
}

func CreateBox(c echo.Context) error {
	cc := c.(*ApiContext)

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
		for _, image := range images {
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
		Containers: []pod.UserContainer{container},
		Resource:   pod.UserResource{Vcpu: 1, Memory: 256},
		Tty:        true,
	}

	podID, _, err := cc.hyper.CreatePod(pod)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, CreateBoxResponse{PodID: podID})
}

type execMessage struct {
	Type    string `json:"type"`
	Message string `json:"message"`
}

func ExecBox(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		podID := ""

		sendErr := func(msg string) {
			websocket.Message.Send(ws, execMessage{Type: "error", Message: msg})
		}

		defer ws.Close()
		for {
			raw := ""
			err := websocket.Message.Receive(ws, &raw)
			if err != nil {
				log.Println(err)
				sendErr("error receiving message, closing")
				return
			}
			var msg execMessage

			if err := json.Unmarshal([]byte(raw), &msg); err != nil {
				sendErr("malformed message received, closing")
				return
			}

			switch msg.Type {
			case "attach":
				if podID != "" {
					sendErr("podID already set, closing")
					return
				}

				podID = msg.Message

			}

		}
	}).ServeHTTP(c.Response(), c.Request())
	return nil
}
