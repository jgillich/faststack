package main

import (
	"net/http"

	"github.com/Sirupsen/logrus"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/termbox/termbox/api/config"
	"github.com/termbox/termbox/api/driver"
)

type Api struct {
	log    *logrus.Logger
	config *config.Config
	echo   *echo.Echo
}

func New(config *config.Config) *Api {

	// -- Logging

	log := logrus.New()

	// -- Echo

	echo := echo.New()

	echo.Use(middleware.Gzip())

	// -- Api

	a := &Api{log, config, echo}

	echo.POST("/machines", a.createMachine)

	echo.DELETE("/machines/:name", a.deleteMachine)

	return a
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

func (a *Api) getDriver(m *driver.Machine) (driver.Driver, error) {
	ctx := driver.DriverContext{Config: a.config.DriverConfig, Machine: m}

	if a.config.ClusterConfig.Enable {
		return driver.NewClusterDriver(&ctx)
	} else {
		return driver.NewDriver(&ctx)
	}
}

func (a *Api) createMachine(c echo.Context) error {

	m := new(driver.Machine)
	if err := c.Bind(m); err != nil {
		return err
	}

	driver, err := a.getDriver(m)
	if err != nil {
		return err
	}

	if err := driver.Create(); err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, m)
}

func (a *Api) deleteMachine(c echo.Context) error {

	M := driver.Machine{
		Name:   c.Param("name"),
		Driver: TODO,
	}

	driver, err := a.getDriver(m)
	if err != nil {
		return err
	}

	if err := driver.Delete(); err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, m)
}
