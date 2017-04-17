package cli

import (
	"io/ioutil"
	"os"
	"path/filepath"

	"os/user"

	yaml "gopkg.in/yaml.v2"
)

type Config struct {
	Token        string `yaml:"token"`
	Billstack    string `yaml:"billstack"`
	Machinestack string `yaml:"machinestack"`
}

func saveConfig(c Config, path string) error {
	if path[:2] == "~/" {
		u, err := user.Current()
		if err != nil {
			return err
		}
		path = filepath.Join(u.HomeDir, path[2:])
	}

	d, err := yaml.Marshal(&c)
	if err != nil {
		return err
	}

	if err := os.MkdirAll(filepath.Dir(path), os.ModePerm); err != nil {
		return err
	}

	return ioutil.WriteFile(path, d, os.ModePerm)
}
