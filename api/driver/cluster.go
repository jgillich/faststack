package driver

import (
	"fmt"
	"strconv"

	"net/url"

	"github.com/hashicorp/consul/api"
	"github.com/jmcvetta/randutil"
	"github.com/termbox/termbox/api/config"
)

// ClusterDriver implements the Driver interface in a driver-agnostic way
// and distributes requests among cluster memembers
type ClusterDriver struct {
	machine *Machine
	config  *config.Config
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
	host, err := c.getNextHost()
	if err != nil {
		return err
	}

	url, err := url.Parse(fmt.Sprintf("%s:%v", host.Node.Node, host.Service.Port))
	if err != nil {
		return err
	}

	driverCtx := DriverContext{
		Machine: c.machine,
		Config:  c.config,
		Remote:  url,
	}

	driver, err := NewDriver(&driverCtx)
	if err != nil {
		return err
	}

	err = driver.Create()
	if err != nil {
		return err
	}

	pair := api.KVPair{Key: fmt.Sprintf("machines/%v/host", c.machine.Name), Value: []byte(url.String())}

	_, err = c.kv.Put(&pair, nil)
	if err != nil {
		return err
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

func (c *ClusterDriver) getNextHost() (*api.ServiceEntry, error) {
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
	hostPair, _, err := c.kv.Get(fmt.Sprintf("machines/%v/host", c.machine.Name), nil)
	if err != nil {
		return nil, err
	}

	url, err := url.Parse(string(hostPair.Value))
	if err != nil {
		return nil, err
	}

	driverCtx := DriverContext{
		Machine: c.machine,
		Config:  c.config,
		Remote:  url,
	}

	return NewDriver(&driverCtx)
}
