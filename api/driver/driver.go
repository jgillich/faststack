package driver

import (
	"fmt"
)

type Factory func(map[string]string) (Driver, error)

var BuiltinDrivers = map[string]Factory{
	"lxd": NewLxdDriver,
}

func NewDriver(name string, options map[string]string) (Driver, error) {
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
