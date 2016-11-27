package api

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"golang.org/x/net/websocket"

	"github.com/hyperhq/runv/hypervisor/pod"
	"github.com/labstack/echo"
)

type createResponse struct {
	podID string
	error string
}

func createBox(c echo.Context) error {
	cc := c.(*ApiContext)

	image := c.FormValue("image")
	if !imageAllowed(image) {
		return c.JSON(http.StatusBadRequest, createResponse{error: "invalid image"})
	}

	container := pod.UserContainer{
		Image: image,
	}

	pod := pod.UserPod{
		Containers: []pod.UserContainer{container},
		Resource:   pod.UserResource{Vcpu: 1, Memory: 256},
		Tty:        true,
	}

	podID, statusCode, err := cc.hyper.CreatePod(pod)
	if err != nil {
		log.Println(err, statusCode)
		return c.JSON(http.StatusInternalServerError, createResponse{error: "failed to create pod"})
	}

	return c.JSON(http.StatusOK, createResponse{podID: podID})
}

func imageAllowed(imageName string) bool {
	dat, err := ioutil.ReadFile("config/images.json")
	if err != nil {
		log.Fatal(err)
	}

	var images []string
	err = json.Unmarshal([]byte(dat), &images)
	if err != nil {
		log.Fatal(err)
	}

	for _, i := range images {
		if i == imageName {
			return true
		}
	}
	return false
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
