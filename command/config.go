package command

import (
	"io/ioutil"
	"os"
	"path/filepath"

	"gopkg.in/urfave/cli.v2"

	yaml "gopkg.in/yaml.v2"
)

// Config format
type Config struct {
	Token        string `yaml:"token"`
	Billstack    string `yaml:"billstack"`
	Machinestack string `yaml:"machinestack"`
}

// ParseConfig reads config from cli context
func ParseConfig(c *cli.Context) *Config {
	return &Config{
		Billstack:    c.String("billstack"),
		Machinestack: c.String("machinestack"),
		Token:        c.String("token"),
	}
}

func (c *Config) save(path string) error {
	d, err := yaml.Marshal(c)
	if err != nil {
		return err
	}

	if err := os.MkdirAll(filepath.Dir(path), os.ModePerm); err != nil {
		return err
	}

	return ioutil.WriteFile(path, d, os.ModePerm)
}
