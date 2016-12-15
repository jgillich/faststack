package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"golang.org/x/net/websocket"

	"github.com/hyperhq/runv/lib/term"
	"github.com/termbox/termbox/api"
	"github.com/urfave/cli"
)

func main() {
	app := cli.NewApp()
	app.Action = func(c *cli.Context) error {
		client := Client{
			ServerAddr: "localhost:7842",
		}

		box := client.CreateBox()

		client.ExecBox(box)

		return nil
	}
	app.Run(os.Args)
}

type Client struct {
	ServerAddr string
}

func (c *Client) CreateBox() api.CreateBoxResponse {

	createBox := api.CreateBoxRequest{
		Image:   "termbox/fedora",
		Version: "25",
		Captcha: "",
	}

	req, err := json.Marshal(createBox)
	if err != nil {
		log.Fatal(err)
	}

	res, err := http.Post(fmt.Sprintf("http://%s/boxes", c.ServerAddr), "application/json", bytes.NewBuffer(req))
	if err != nil {
		log.Fatal(err)
	}

	if res.StatusCode != 200 {
		res, err := ioutil.ReadAll(res.Body)
		if err != nil {
			log.Fatal(err)
		}

		log.Fatal(string(res))
	}

	var createdBox api.CreateBoxResponse
	if err := json.NewDecoder(res.Body).Decode(&createdBox); err != nil {
		log.Fatal(err)
	}

	return createdBox
}

func (c *Client) ExecBox(box api.CreateBoxResponse) {

	origin := "http://localhost/"
	ws, err := websocket.Dial(fmt.Sprintf("ws://%s/boxes/%s/exec", c.ServerAddr, box.PodID), "", origin)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	inFd, _ := term.GetFdInfo(os.Stdin)
	oldState, err := term.SetRawTerminal(inFd)
	if err != nil {
		log.Fatal(err)
	}
	defer term.RestoreTerminal(inFd, oldState)

	r, w := io.Pipe()
	defer r.Close()
	defer w.Close()

	isOpen := true

	go func() {
		for isOpen {
			buf := make([]byte, 32*1024)
			n, err := os.Stdin.Read(buf)
			if err == io.EOF {
				break
			}
			if err != nil {
				log.Fatal(err)
			}
			s := string(buf[:n])
			message := api.ExecBoxMessage{Data: s}
			messageSlice, err := json.Marshal(message)
			if err != nil {
				log.Fatal(err)
			}

			_, err = ws.Write(messageSlice)
			if err != nil {
				log.Fatal(err)
			}
		}
	}()

	_, err = io.Copy(os.Stdout, ws)
	if err != nil {
		log.Fatal(err)
	}
	isOpen = false
}
