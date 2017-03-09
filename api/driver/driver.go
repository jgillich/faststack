package driver

import "github.com/termbox/termbox/api/types"

type Driver interface {
	Create(m types.Machine) error
	Delete(m types.Machine) error
}
