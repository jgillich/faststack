package api

import (
	"github.com/hyperhq/hyperd/client/api"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
)

type ApiContext struct {
	echo.Context
	hyper *api.Client
}

func Run() {
	e := echo.New()
	e.Debug = true
	e.Logger.SetLevel(log.DEBUG)

	hyper := api.NewClient("unix", "/var/run/hyper.sock", nil)

	e.Use(func(h echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			cc := &ApiContext{Context: c, hyper: hyper}
			return h(cc)
		}
	})

	e.Static("/", "app")

	e.POST("/box", createBox)
	e.POST("/box/:id/exec", execBox)

	e.Logger.Fatal(e.Start(":8888"))
}
