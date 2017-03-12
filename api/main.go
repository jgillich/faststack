package main

import (
	"log"
	"os"

	"github.com/mitchellh/cli"
	"flag"
	"fmt"
)

func main() {
	c := cli.NewCLI("api", "1.0.0")
	c.Args = os.Args[1:]

	c.Commands = map[string]cli.CommandFactory{
		"": func() (cli.Command, error) {

		},
	}

	exitStatus, err := c.Run()
	if err != nil {
		log.Println(err)
	}

	os.Exit(exitStatus)

	New().Run()
}



type RunCommand struct {
	cli  cli.CLI
}

func (c *RunCommand) Run(args []string) int {
	var configPath = flag.String("config", "", "config file path")

	config := config.ParseConfigFile(configPath)

	if err := New(&config).Run() {
		fmt.Println(err)
		return 1
	}
	return 0
}

func (c *RunCommand) Help() string {
	return c.cli.HelpFunc(c.cli.Commands) + "\n"
}

func (c *RunCommand) Synopsis() string {
	return ""
}
