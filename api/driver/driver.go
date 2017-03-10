package driver

import (
	"fmt"

	"github.com/termbox/termbox/api/types"
)

type Factory func(*DriverContext) (Driver, error)

var BuiltinDrivers = map[string]Factory{
	"lxd": NewLxdDriver,
}

func NewDriver(name string, remote string) (Driver, error) {
	factory, ok := BuiltinDrivers[name]
	if !ok {
		return nil, fmt.Errorf("unknown driver '%s'", name)
	}

	ctx := DriverContext{remote}

	return factory(&ctx)
}

type Driver interface {
	//Name() string
	Create(m *types.Machine) error
	Delete(m *types.Machine) error
}

type DriverContext struct {
	remote string
}
