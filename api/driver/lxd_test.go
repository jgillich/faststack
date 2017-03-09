package driver

import (
	"testing"

	"github.com/termbox/termbox/api/types"
)

var driver, err = NewLxdDriver()

func TestCreateDelete(t *testing.T) {
	if err != nil {
		t.Error(err)
	}

	m := types.Machine{Name: "test-lxddriver", Image: "ubuntu/xenial"}
	if err = driver.Create(m); err != nil {
		t.Error(err)
	}

	containers, err := driver.client.ListContainers()
	if err != nil {
		t.Error(err)
	}

	exists := false
	for _, c := range containers {
		if c.Name == m.Name {
			exists = true
		}
	}

	if !exists {
		t.Error("container does not exist")
	}

	err = driver.Delete(m)

	containers, err = driver.client.ListContainers()
	if err != nil {
		t.Error(err)
	}

	exists = false
	for _, c := range containers {
		if c.Name == m.Name {
			exists = true
		}
	}

	if exists {
		t.Error("container still exists")
	}
}
