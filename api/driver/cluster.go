package driver

import (
	"fmt"
	"strconv"

	"github.com/hashicorp/consul/api"
	"github.com/jmcvetta/randutil"
	"github.com/termbox/termbox/api/types"
)

// ClusterDriver implements the Driver interface in a driver-agnostic way
// and distributes requests among cluster memembers
type ClusterDriver struct {
	health  *api.Health
	catalog *api.Catalog
	kv      *api.KV
}

func NewClusterDriver() (Driver, error) {
	consul, err := api.NewClient(api.DefaultConfig())
	if err != nil {
		return nil, err
	}

	return &ClusterDriver{catalog: consul.Catalog(), kv: consul.KV(), health: consul.Health()}, nil
}

func (c *ClusterDriver) Create(machine *types.Machine) error {
	host, err := c.getNextHost(machine.Driver)
	if err != nil {
		return err
	}

	address := fmt.Sprintf("%s:%v", host.Node.Node, host.Service.Port)

	driver, err := NewDriver(machine.Driver, address)
	if err != nil {
		return err
	}

	err = driver.Create(machine)
	if err != nil {
		return err
	}

	pair := api.KVPair{Key: fmt.Sprintf("machines/%v/host", machine.Name), Value: []byte(host.Node.Node)}

	_, err = c.kv.Put(&pair, nil)
	if err != nil {
		return err
	}

	return nil
}

func (c *ClusterDriver) Delete(machine *types.Machine) error {
	driver, err := c.getMachineDriver(machine)
	if err != nil {
		return err
	}

	if err = driver.Delete(machine); err != nil {
		return err
	}

	_, err = c.kv.Delete(fmt.Sprintf("machines/%v", machine.Name), nil)
	if err != nil {
		return err
	}

	return nil
}

func (c *ClusterDriver) getNextHost(driver string) (*api.ServiceEntry, error) {
	hosts, _, err := c.health.Service(driver, "", true, nil)

	if err != nil {
		return nil, err
	}

	if len(hosts) == 0 {
		return nil, fmt.Errorf("no hosts found for driver %v", driver)
	}

	var choices []randutil.Choice
	for _, h := range hosts {
		weightStr, _ := h.Node.Meta["weight"]

		weight, err := strconv.Atoi(weightStr)
		if err != nil {
			weight = 1
		}

		choices = append(choices, randutil.Choice{Item: h, Weight: weight})
	}

	choice, err := randutil.WeightedChoice(choices)
	if err != nil {
		return nil, err
	}

	return choice.Item.(*api.ServiceEntry), nil
}

func (c *ClusterDriver) getMachineDriver(machine *types.Machine) (Driver, error) {
	hostPair, _, err := c.kv.Get(fmt.Sprintf("machines/%v/host", machine.Name), nil)
	if err != nil {
		return nil, err
	}

	return NewDriver(machine.Driver, string(hostPair.Value))
}
