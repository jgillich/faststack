package scheduler

import (
	"fmt"
	"strconv"

	"github.com/hashicorp/consul/api"
	"github.com/jmcvetta/randutil"
	"github.com/termbox/termbox/api/config"
	"github.com/termbox/termbox/api/driver"
	"gopkg.in/redis.v5"
)

type ConsulScheduler struct {
	redis   *redis.Client
	config  *config.Config
	health  *api.Health
	catalog *api.Catalog
	kv      *api.KV
}

func NewConsulScheduler(config *config.Config) (*ConsulScheduler, error) {
	consul, err := api.NewClient(api.DefaultConfig())
	if err != nil {
		return nil, err
	}

	redis := redis.NewClient(&redis.Options{
		Addr:     config.RedisConfig.Address,
		Password: config.RedisConfig.Password,
		DB:       config.RedisConfig.Database,
	})

	return &ConsulScheduler{
		config:  config,
		redis:   redis,
		catalog: consul.Catalog(),
		kv:      consul.KV(),
		health:  consul.Health(),
	}, nil
}

func (c *ConsulScheduler) Create(name, image, driverName string) error {
	hosts, _, err := c.health.Service(driverName, "", true, nil)
	if err != nil {
		return err
	}

	if len(hosts) == 0 {
		return fmt.Errorf("no hosts found for driver '%v'", driverName)
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
		return err
	}

	entry := choice.Item.(*api.ServiceEntry)

	driver, err := c.newDriver(driverName, entry.Node)
	if err != nil {
		return err
	}

	if err := driver.Create(name, image); err != nil {
		return err
	}

	return c.redis.HMSet(fmt.Sprintf("machine:%s", name), map[string]string{
		"image":  image,
		"driver": driverName,
		"nodeID": entry.Node.ID,
	}).Err()
}

func (c *ConsulScheduler) Delete(name string) error {
	hash, err := c.redis.HGetAll(fmt.Sprintf("machine:%s", name)).Result()

	nodeID, ok := hash["nodeID"]
	if !ok {
		return fmt.Errorf("machine '%s' does not exist", name)
	}

	node, _, err := c.catalog.Node(nodeID, nil)
	if err != nil {
		return err
	}

	driver, err := c.newDriver(hash["driver"], node.Node)
	if err != nil {
		return err
	}

	if err := driver.Delete(name); err != nil {
		return err
	}

	return c.redis.HDel(fmt.Sprintf("machine:%s", name)).Err()
}

func (c *ConsulScheduler) newDriver(name string, node *api.Node) (driver.Driver, error) {
	driverOptions := make(map[string]string)
	for key, value := range c.config.DriverConfig.Options {
		driverOptions[key] = value
	}

	// TODO protocol, port
	remote := fmt.Sprintf("%s:%v", node.Node, 1000)

	driverOptions[fmt.Sprintf("%s.remote", name)] = remote

	return driver.NewDriver(name, driverOptions)
}
