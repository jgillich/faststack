package api

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"golang.org/x/net/websocket"

	"github.com/hyperhq/runv/hypervisor/pod"
	"github.com/labstack/echo"
)

var (
	images Images
)

func init() {
	dat, err := ioutil.ReadFile("app/config/images.json")
	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal([]byte(dat), &images)
	if err != nil {
		log.Fatal(err)
	}
}

type createResponse struct {
	podID string
}

func createBox(c echo.Context) error {
	cc := c.(*ApiContext)

	s := strings.Split(c.FormValue("image"), ":")
	image, version := s[0], s[1]

	imageAllowed := func(imageName string) bool {
		for _, i := range images {
			if i.Name == image {
				for _, v := range i.Versions {
					if v == version {
						return true
					}
				}
			}
		}
		return false
	}
	if !imageAllowed(image) {
		return errors.New("image not allowed")
	}

	container := pod.UserContainer{
		Image: image,
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

	return c.JSON(http.StatusOK, createResponse{podID: podID})
}

type execMessage struct {
	Type    string `json:"type"`
	Message string `json:"message"`
}

func execBox(c echo.Context) error {
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
