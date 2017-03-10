package driver

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/termbox/termbox/api/types"
)

var driver, err = NewLxdDriver()

func TestCreateDelete(t *testing.T) {
	assert.NoError(t, err)

	m := types.Machine{Name: "termbox-test", Image: "ubuntu:16.04"}
	assert.NoError(t, driver.Create(&m))

	containers, err := driver.client.ListContainers()
	assert.NoError(t, err)

	exists := false
	for _, c := range containers {
		if c.Name == m.Name {
			exists = true
		}
	}

	if !exists {
		t.Error("container does not exist")
	}

	assert.NoError(t, driver.Delete(&m))

	containers, err = driver.client.ListContainers()
	assert.NoError(t, err)

	for _, c := range containers {
		if c.Name == m.Name {
			t.Error("container still exists")
		}
	}
}
