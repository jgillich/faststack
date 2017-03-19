package driver

import (
	"fmt"
	"io"

	"github.com/faststackco/faststack/api/config"
	"github.com/gorilla/websocket"
)

type Factory func(config.DriverOptions) (Driver, error)

var BuiltinDrivers = map[string]Factory{
	"lxd": NewLxdDriver,
}

func NewDriver(name string, options config.DriverOptions) (Driver, error) {
	factory, ok := BuiltinDrivers[name]
	if !ok {
		return nil, fmt.Errorf("unknown driver '%s'", name)
	}

	return factory(options)
}

type Driver interface {
	Create(name, image string) error
	Delete(name string) error
	Exec(name string, stdin io.ReadCloser, stdout io.WriteCloser, stderr io.WriteCloser, controlHandler func(*websocket.Conn)) error
}
