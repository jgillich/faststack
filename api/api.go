package main

import (
	"fmt"
	"net/http"

	"os"

	"github.com/Sirupsen/logrus"
	"github.com/kelseyhightower/envconfig"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/termbox/termbox/api/driver"
	"github.com/termbox/termbox/api/types"
)

type ApiConfig struct {
	Env     string `default:"development"`
	Addr    string `default:":7842"`
	TlsCert string
	TlsKey  string
	AutoTls bool
}

func (a *ApiConfig) Debug() bool {
	return a.Env != "production"
}

type Api struct {
	log    *logrus.Logger
	config *ApiConfig
	echo   *echo.Echo
	driver driver.Driver
}

func New() *Api {

	// -- Logging

	log := logrus.New()

	// -- Configuration

	if os.Getenv("PORT") != "" {
		os.Setenv("TERMBOX_ADDR", fmt.Sprintf(":%s", os.Getenv("PORT")))
	}

	var config ApiConfig
	if err := envconfig.Process("termbox", &config); err != nil {
		log.Fatal(err)
	}

	if config.Debug() {
		log.Level = logrus.DebugLevel
	}

	// -- Echo

	echo := echo.New()
	echo.Debug = config.Debug()

	if !config.Debug() {
		echo.Use(middleware.Gzip())
	}

	// -- Driver

	driver, err := driver.NewClusterDriver()

	if err != nil {
		log.Fatal(err)
	}

	// -- Api

	a := &Api{log, &config, echo, driver}

	echo.POST("/machines", a.createMachine)

	return a
}

func (a *Api) Run() {
	var err error

	if a.config.AutoTls {
		err = a.echo.StartAutoTLS(a.config.Addr)
	} else if a.config.TlsCert != "" && a.config.TlsKey != "" {
		err = a.echo.StartTLS(a.config.Addr, a.config.TlsCert, a.config.TlsKey)
	} else {
		err = a.echo.Start(a.config.Addr)
	}

	if err != nil {
		a.log.Fatal(err)
	}
}

func (a *Api) createMachine(c echo.Context) error {

	m := new(types.Machine)
	if err := c.Bind(m); err != nil {
		return err
	}

	if err := a.driver.Create(m); err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, m)
}
