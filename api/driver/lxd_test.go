package driver

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLxdDriver(t *testing.T) {
	name := "faststack-TestLxdDriver"
	image := "ubuntu/xenial"

	options := map[string]string{
		"lxd.remote": "unix://",
	}

	driver, err := NewLxdDriver(options)
	assert.NoError(t, err)

	assert.NoError(t, driver.Create(name, image))

	containers, err := driver.(*LxdDriver).client.ListContainers()
	assert.NoError(t, err)

	exists := false
	for _, c := range containers {
		if c.Name == name {
			exists = true
		}
	}

	if !exists {
		t.Error("container does not exist")
	}

	assert.NoError(t, driver.Delete(name))

	containers, err = driver.(*LxdDriver).client.ListContainers()
	assert.NoError(t, err)

	for _, c := range containers {
		if c.Name == name {
			t.Error("container still exists")
		}
	}
}
