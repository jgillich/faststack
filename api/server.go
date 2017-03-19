package main

import (
	"github.com/faststackco/faststack/api/config"
	"github.com/faststackco/faststack/api/handler"
	"github.com/faststackco/faststack/api/scheduler"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"gopkg.in/redis.v5"
)

type Server struct {
	Address   string
	TLSConfig *config.TLSConfig
	echo.Echo
}

func NewServer(config *config.Config) (*Server, error) {

	redis := redis.NewClient(&redis.Options{
		Addr:     config.RedisConfig.Address,
		Password: config.RedisConfig.Password,
		DB:       config.RedisConfig.Database,
	})

	sched, err := scheduler.NewScheduler(config.SchedulerConfig.Name, redis, &config.DriverConfig.Options)
	if err != nil {
		return nil, err
	}

	hand := handler.NewHandler(redis, sched)

	echo := echo.New()

	echo.Use(middleware.Gzip())

	echo.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey:  config.AuthConfig.Key,
		TokenLookup: "header:Authorization",
		Claims:      handler.JwtClaims{},
	}))

	echo.POST("/machines", hand.CreateMachine)

	echo.DELETE("/machines/:name", hand.DeleteMachine)

	return &Server{config.Address, config.TLSConfig, *echo}, nil
}

// Start server while auto detecting TLS settings
func (s *Server) StartAuto() error {
	if s.TLSConfig.Enable {
		if s.TLSConfig.Auto {
			return s.StartAutoTLS(s.Address)
		}
		return s.StartTLS(s.Address, s.TLSConfig.Cert, s.TLSConfig.Key)
	}
	return s.Start(s.Address)
}
