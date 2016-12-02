package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/bamzi/jobrunner"
	"github.com/hyperhq/hyperd/client"
	"github.com/hyperhq/hyperd/client/api"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
)

var (
	Hyper       = api.NewClient("unix", "/var/run/hyper.sock", nil)
	HyperClient = client.NewHyperClient("unix", "/var/run/hyper.sock", nil)
	Images      []Image
)

type ApiContext struct {
	echo.Context
	hyper *api.Client
}

func init() {
	dat, err := ioutil.ReadFile("images/images.json")
	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal([]byte(dat), &Images)
	if err != nil {
		log.Fatal(err)
	}
}

func Run() {
	e := echo.New()
	e.Debug = true
	e.Logger.SetLevel(log.DEBUG)

	jobrunner.Start()
	jobrunner.Now(PullImages{})
	jobrunner.Schedule("@midnight", PullImages{})

	e.Static("/", "app")

	e.POST("/boxes", CreateBox)
	e.POST("/boxes/:id/exec", ExecBox)

	e.Logger.Fatal(e.Start(":8888"))
}

type PullImages struct {
}

func (c PullImages) Run() {
	for _, image := range Images {
		for _, version := range image.Versions {
			imageName := fmt.Sprintf("%s:%s", image.Image, version)
			log.Info("Pulling image ", imageName)
			HyperClient.PullImage(imageName)
		}
	}
}
