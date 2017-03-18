package driver

import (
	"fmt"

	"github.com/faststackco/faststack/api/config"
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
}
