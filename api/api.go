package main

import (
	"fmt"
	"net/http"

	"github.com/Sirupsen/logrus"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/faststackco/faststack/api/config"
	"github.com/faststackco/faststack/api/scheduler"
	"github.com/faststackco/faststack/api/types"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"gopkg.in/redis.v5"
)

type Api struct {
	log   *logrus.Logger
	echo  *echo.Echo
	redis *redis.Client
	sched scheduler.Scheduler
	config.Config
}

func New(config *config.Config) (*Api, error) {

	redis := redis.NewClient(&redis.Options{
		Addr:     config.RedisConfig.Address,
		Password: config.RedisConfig.Password,
		DB:       config.RedisConfig.Database,
	})

	// -- Scheduler

	sched, err := scheduler.NewScheduler(config.SchedulerConfig.Name, redis, &config.DriverConfig.Options)
	if err != nil {
		return nil, err
	}

	// -- Logging

	log := logrus.New()

	// -- Echo

	echo := echo.New()

	echo.Use(middleware.Gzip())

	echo.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey:  config.AuthConfig.Key,
		TokenLookup: "header:Authorization",
		Claims:      JwtClaims{},
	}))

	// -- Api

	a := &Api{log, echo, redis, sched, *config}

	echo.POST("/machines", a.createMachine)

	echo.DELETE("/machines/:name", a.deleteMachine)

	return a, nil
}

func (a *Api) Run() error {
	if a.TLSConfig.Enable {
		if a.TLSConfig.Auto {
			return a.echo.StartAutoTLS(a.Address)
		}
		return a.echo.StartTLS(a.Address, a.TLSConfig.Cert, a.TLSConfig.Key)
	}
	return a.echo.Start(a.Address)
}

func (a *Api) createMachine(c echo.Context) error {

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JwtClaims)

	count, _ := a.redis.SCard(fmt.Sprintf("user:%s:machines", claims.Email)).Result()
	if int(count) >= claims.AppMetadata.Quota.Instances {
		return c.String(http.StatusMethodNotAllowed, "quota exceeded")
	}

	req := new(types.CreateMachineRequest)
	if err := c.Bind(req); err != nil {
		return err
	}

	if err := a.sched.Create(req.Name, req.Image, req.Driver); err != nil {
		return err
	}

	if err := a.redis.SAdd(fmt.Sprintf("user:%s:machines", req.Name)).Err(); err != nil {
		return err
	}

	return c.String(http.StatusCreated, "created")
}

func (a *Api) deleteMachine(c echo.Context) error {

	name := c.Param("name")
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JwtClaims)

	ok, err := a.redis.SIsMember(fmt.Sprintf("user:%s:machines", claims.Email), name).Result()
	if err != nil {
		return err
	}
	if !ok {
		return c.String(http.StatusBadRequest, "machine does not exist or isn't yours")
	}

	if err := a.sched.Delete(name); err != nil {
		return err
	}

	return c.String(http.StatusOK, "deleted")
}
