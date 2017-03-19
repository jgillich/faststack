package scheduler

import (
	"fmt"
	"io"

	"github.com/faststackco/faststack/api/config"
	"github.com/gorilla/websocket"
	redis "gopkg.in/redis.v5"
)

type Scheduler interface {
	Create(name, image, driverName string) error
	Delete(name string) error
	Exec(name string, stdin io.ReadCloser, stdout io.WriteCloser, stderr io.WriteCloser, controlHandler func(*websocket.Conn)) error
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
