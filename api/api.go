package main

import (
	"net/http"

	"github.com/Sirupsen/logrus"
	"github.com/faststackco/faststack/api/config"
	"github.com/faststackco/faststack/api/scheduler"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type Api struct {
	log    *logrus.Logger
	config *config.Config
	echo   *echo.Echo
	sched  scheduler.Scheduler
}

func New(config *config.Config) (*Api, error) {

	// -- Scheduler

	sched, err := scheduler.NewConsulScheduler(config)
	if err != nil {
		return nil, err
	}

	// -- Logging

	log := logrus.New()

	// -- Echo

	echo := echo.New()

	echo.Use(middleware.Gzip())

	// -- Api

	a := &Api{log, config, echo, sched}

	echo.POST("/machines", a.createMachine)

	echo.DELETE("/machines/:name", a.deleteMachine)

	return a, nil
}

func (a *Api) Run() error {

	if a.config.TLSConfig.Enable {
		if a.config.TLSConfig.Auto {
			return a.echo.StartAutoTLS(a.config.Address)
		} else {
			return a.echo.StartTLS(a.config.Address, a.config.TLSConfig.Cert, a.config.TLSConfig.Key)
		}
	} else {
		return a.echo.Start(a.config.Address)
	}
}

func (a *Api) createMachine(c echo.Context) error {

	type request struct {
		Name   string
		Driver string
		Image  string
	}

	req := new(request)
	if err := c.Bind(req); err != nil {
		return err
	}

	if err := a.sched.Create(req.Name, req.Image, req.Driver); err != nil {
		return err
	}

	return c.String(http.StatusCreated, "created")
}

func (a *Api) deleteMachine(c echo.Context) error {

	if err := a.sched.Delete(c.Param("name")); err != nil {
		return err
	}

	return c.String(http.StatusOK, "deleted")
}
