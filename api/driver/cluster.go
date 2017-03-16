package driver

import (
	"fmt"
	"strconv"

	"github.com/hashicorp/consul/api"
	"github.com/jmcvetta/randutil"
	"github.com/termbox/termbox/api/config"
)

// ClusterDriver implements the Driver interface in a driver-agnostic way
// and distributes requests among cluster memembers
type ClusterDriver struct {
	machine *Machine
	config  *config.DriverConfig
	health  *api.Health
	catalog *api.Catalog
	kv      *api.KV
}

func NewClusterDriver(ctx *DriverContext) (Driver, error) {
	consul, err := api.NewClient(api.DefaultConfig())
	if err != nil {
		return nil, err
	}

	return &ClusterDriver{
		machine: ctx.Machine,
		config:  ctx.Config,
		catalog: consul.Catalog(),
		kv:      consul.KV(),
		health:  consul.Health(),
	}, nil
}

func (c *ClusterDriver) Create() error {
	entry, err := c.getNextRemote()
	if err != nil {
		return err
	}

	// TODO protocol, no port
	remote := fmt.Sprintf("%s:%v", entry.Node.Node, entry.Service.Port)

	driverCtx, err := c.getDriverCtx(remote)
	if err != nil {
		return err
	}

	driver, err := NewDriver(driverCtx)
	if err != nil {
		return err
	}

	err = driver.Create()
	if err != nil {
		return err
	}

	pairs := []api.KVPair{
		api.KVPair{Key: fmt.Sprintf("machines/%v/driver", c.machine.Name), Value: []byte(c.machine.Driver)},
		api.KVPair{Key: fmt.Sprintf("machines/%v/image", c.machine.Name), Value: []byte(c.machine.Image)},
		api.KVPair{Key: fmt.Sprintf("machines/%v/remote", c.machine.Name), Value: []byte(remote)},
	}

	for _, pair := range pairs {
		_, err = c.kv.Put(&pair, nil)
		if err != nil {
			return err
		}
	}

	return nil
}

func (c *ClusterDriver) Delete() error {
	driver, err := c.getMachineDriver()
	if err != nil {
		return err
	}

	if err = driver.Delete(); err != nil {
		return err
	}

	_, err = c.kv.Delete(fmt.Sprintf("machines/%v", c.machine.Name), nil)
	if err != nil {
		return err
	}

	return nil
}

func (c *ClusterDriver) getNextRemote() (*api.ServiceEntry, error) {
	hosts, _, err := c.health.Service(c.machine.Driver, "", true, nil)

	if err != nil {
		return nil, err
	}

	if len(hosts) == 0 {
		return nil, fmt.Errorf("no hosts found for driver %v", c.machine.Driver)
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

func (c *ClusterDriver) getMachineDriver() (Driver, error) {
	hostPair, _, err := c.kv.Get(fmt.Sprintf("machines/%v/remote", c.machine.Name), nil)
	if err != nil {
		return nil, err
	}

	driverCtx, err := c.getDriverCtx(string(hostPair.Value))
	if err != nil {
		return nil, err
	}

	return NewDriver(driverCtx)
}

func (c *ClusterDriver) getDriverCtx(remote string) (*DriverContext, error) {
	// create copy of driver options so we can overwrite the remote
	driverOptions := make(map[string]string)
	for key, value := range c.config.Options {
		driverOptions[key] = value
	}

	driverPair, _, err := c.kv.Get(fmt.Sprintf("machines/%v/driver", c.machine.Name), nil)
	if err != nil {
		return nil, err
	}

	driverOptions[fmt.Sprintf("%s.remote", driverPair.Value)] = remote

	c.config.Options = driverOptions

	return &DriverContext{
		Machine: c.machine,
		Config: &config.DriverConfig{
			Enable:  c.config.Enable,
			Options: driverOptions,
		},
	}, nil
}
