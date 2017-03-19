package scheduler

import (
	"fmt"

	"github.com/faststackco/faststack/api/config"
	redis "gopkg.in/redis.v5"
)

type Scheduler interface {
	Create(name, image, driverName string) error
	Delete(name string) error
}

func NewScheduler(name string, redis *redis.Client, options *config.DriverOptions) (Scheduler, error) {
	switch name {
	case "local":
		return NewLocalScheduler(redis, options)
	case "consul":
		return NewConsulScheduler(redis, options)
	default:
		return nil, fmt.Errorf("unknown scheduler '%s'", name)
	}
}
