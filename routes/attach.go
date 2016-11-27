package routes

import (
	"encoding/json"
	"log"

	"github.com/labstack/echo"
	"golang.org/x/net/websocket"
)

type attachMessage struct {
	Type    string `json:"type"`
	Message string `json:"message"`
}

func (a *Routes) Attach(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		podID := ""

		sendErr := func(msg string) {
			websocket.Message.Send(ws, attachMessage{Type: "error", Message: msg})
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
			var msg attachMessage

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
