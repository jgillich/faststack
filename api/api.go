package api

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"net/http"
	"strings"

	"time"

	"github.com/Sirupsen/logrus"
	"github.com/hyperhq/hyperd/client"
	"github.com/hyperhq/hyperd/client/api"
	"github.com/kelseyhightower/envconfig"
	"github.com/labstack/echo"
	"github.com/robfig/cron"
)

type ApiConfig struct {
	Env        string `default:"development"`
	Addr       string `default:":7842"`
	TlsCert    string
	TlsKey     string
	HyperProto string `default:"unix"`
	HyperAddr  string `default:"/var/run/hyper.sock"`
	RCSecret   string
}

func (a *ApiConfig) Debug() bool {
	return a.Env != "production"
}

type Api struct {
	Log         *logrus.Logger
	Config      *ApiConfig
	Echo        *echo.Echo
	Images      *[]Image
	Hyper       *api.Client
	HyperClient *client.HyperClient
	Cron        *cron.Cron
}

func New() *Api {

	// -- Logging

	Log := logrus.New()

	// -- Configuration

	var Config ApiConfig
	if err := envconfig.Process("termbox", &Config); err != nil {
		Log.Fatal(err)
	}

	// -- Echo

	Echo := echo.New()
	Echo.Debug = Config.Debug()

	Echo.Static("/", "app")

	Echo.Renderer = &Template{
		templates: template.Must(template.ParseGlob("api/views/*.html")),
	}

	Echo.HTTPErrorHandler = func(err error, c echo.Context) {
		httpError, ok := err.(*echo.HTTPError)
		if ok {
			errorCode := httpError.Code
			switch errorCode {
			case http.StatusNotFound:
				// Render index in case of 404 and let the frontend take over
				c.Render(http.StatusOK, "index", Config)
				return
			}
		}
		Echo.DefaultHTTPErrorHandler(err, c)
	}

	// -- Images

	dat, err := ioutil.ReadFile("images/images.json")
	if err != nil {
		Log.Fatal(err)
	}

	var Images []Image
	if err := json.Unmarshal([]byte(dat), &Images); err != nil {
		Log.Fatal(err)
	}

	// -- Hyper

	Hyper := api.NewClient(Config.HyperProto, Config.HyperAddr, nil)

	HyperClient := client.NewHyperClient(Config.HyperProto, Config.HyperAddr, nil)

	// -- Cron

	Cron := cron.New()
	Cron.AddFunc("* * * * *", func() {
		remoteInfo, err := Hyper.List("pod", "", "", true)
		if err != nil {
			Log.Error(err)
			return
		}

		for _, podData := range remoteInfo.GetList("podData") {
			fields := strings.Split(podData, ":")
			podID, podName := fields[0], fields[1]

			if podName != "termbox" {
				continue
			}

			podInfo, err := Hyper.GetPodInfo(podID)
			if err != nil {
				Log.Error(err)
				continue
			}

			if time.Duration(time.Now().Unix()-podInfo.CreatedAt) > time.Hour*6 {
				if err := Hyper.RmPod(podID); err != nil {
					Log.Error(err)
					continue
				}
				Log.Info("Deleted ", podID)
			}

		}
	})

	Cron.AddFunc("@daily", func() {
		for _, image := range Images {
			for _, version := range image.Versions {
				imageName := fmt.Sprintf("%s:%s", image.Image, version)
				Log.Info("Pulling image ", imageName)
				if err := HyperClient.PullImage(imageName); err != nil {
					Log.Error(err)
				}
			}
		}
	})

	// -- Api

	a := &Api{Log, &Config, Echo, &Images, Hyper, HyperClient, Cron}

	Echo.POST("/boxes", a.CreateBox)
	Echo.GET("/boxes/:id/exec", a.ExecBox)

	return a
}

func (a *Api) Run() {
	a.Cron.Start()

	if a.Config.TlsCert != "" && a.Config.TlsKey != "" {
		a.Log.Fatal(a.Echo.StartTLS(a.Config.Addr, a.Config.TlsCert, a.Config.TlsKey))
	} else {
		a.Log.Fatal(a.Echo.Start(a.Config.Addr))
	}
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
