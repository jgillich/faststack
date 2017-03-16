package driver

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/termbox/termbox/api/config"
)

func TestLxdDriver(t *testing.T) {
	machine := Machine{
		Name:   "faststack-TestLxdDriver",
		Driver: "lxd",
		Image:  "ubuntu/xenial",
	}

	config := config.DriverConfig{
		Enable: []string{"lxd"},
		Options: map[string]string{
			"lxd.remote": "unix://",
		},
	}

	driver, err := NewLxdDriver(&DriverContext{&machine, &config})
	assert.NoError(t, err)

	assert.NoError(t, driver.Create())

	containers, err := driver.(*LxdDriver).client.ListContainers()
	assert.NoError(t, err)

	exists := false
	for _, c := range containers {
		if c.Name == machine.Name {
			exists = true
		}
	}

	if !exists {
		t.Error("container does not exist")
	}

	assert.NoError(t, driver.Delete())

	containers, err = driver.(*LxdDriver).client.ListContainers()
	assert.NoError(t, err)

	for _, c := range containers {
		if c.Name == machine.Name {
			t.Error("container still exists")
		}
	}
}
