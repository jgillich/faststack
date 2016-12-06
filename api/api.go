package api

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"strings"

	"time"

	rice "github.com/GeertJohan/go.rice"
	"github.com/Sirupsen/logrus"
	"github.com/hyperhq/hyperd/client"
	"github.com/hyperhq/hyperd/client/api"
	"github.com/kelseyhightower/envconfig"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/robfig/cron"
)

type ApiConfig struct {
	Env        string `default:"development"`
	Addr       string `default:":7842"`
	TlsCert    string
	TlsKey     string
	AutoTls    bool
	HyperProto string `default:"unix"`
	HyperAddr  string `default:"/var/run/hyper.sock"`
	RCSitekey  string
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

	if Config.Debug() {
		Log.Level = logrus.DebugLevel
	}

	// -- Echo

	Echo := echo.New()
	Echo.Debug = Config.Debug()

	assetHandler := http.FileServer(rice.MustFindBox("../app").HTTPBox())
	Echo.GET("/app/*", echo.WrapHandler(http.StripPrefix("/app/", assetHandler)))
	// fonts are still loaded from /jspm_packages/..
	Echo.GET("/jspm_packages/*", echo.WrapHandler(assetHandler))

	funcs := template.FuncMap{
		"marshal": func(v interface{}) template.JS {
			a, _ := json.Marshal(v)
			return template.JS(a)
		},
	}

	templates := rice.MustFindBox("./views")
	index, _ := templates.String("index.html")
	Echo.Renderer = &Template{
		templates: template.Must(template.New("index").Funcs(funcs).Parse(index)),
	}

	if !Config.Debug() {
		Echo.Use(middleware.Gzip())
	}

	// -- Images

	dat, err := rice.MustFindBox("../images").Bytes("images.json")
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
	Cron.AddFunc("@every 10m", func() {
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

			if (time.Now().Unix() - podInfo.CreatedAt) > 3600 {
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
	Echo.GET("/", func(c echo.Context) error { return c.Render(http.StatusOK, "index", a) })

	return a
}

func (a *Api) Run() {
	a.Echo.HTTPErrorHandler = func(err error, c echo.Context) {
		httpError, ok := err.(*echo.HTTPError)
		if ok {
			errorCode := httpError.Code
			switch errorCode {
			case http.StatusNotFound:
				// Render index in case of 404 and let the frontend take over
				if err := c.Render(http.StatusOK, "index", a); err != nil {
					a.Log.Error(err)
				}
				return
			}
		}
		a.Log.Info(err)
		a.Echo.DefaultHTTPErrorHandler(err, c)
	}

	a.Cron.Start()

	var err error

	if a.Config.AutoTls {
		err = a.Echo.StartAutoTLS(a.Config.Addr)
	} else if a.Config.TlsCert != "" && a.Config.TlsKey != "" {
		err = a.Echo.StartTLS(a.Config.Addr, a.Config.TlsCert, a.Config.TlsKey)
	} else {
		err = a.Echo.Start(a.Config.Addr)
	}

	if err != nil {
		a.Log.Fatal(err)
	}
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
