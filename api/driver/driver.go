package driver

import (
	"fmt"

	"github.com/termbox/termbox/api/config"
)

type Factory func(*DriverContext) (Driver, error)

var BuiltinDrivers = map[string]Factory{
	"lxd": NewLxdDriver,
}

func NewDriver(ctx *DriverContext) (Driver, error) {
	factory, ok := BuiltinDrivers[ctx.Machine.Driver]
	if !ok {
		return nil, fmt.Errorf("unknown driver '%s'", ctx.Machine.Driver)
	}

	return factory(ctx)
}

type Driver interface {
	Create() error
	Delete() error
}

type DriverContext struct {
	Machine *Machine
	Config  *config.DriverConfig
}

type Machine struct {
	Name   string `json:"name"`
	Image  string `json:"image"`
	Driver string `json:"driver"`
}
