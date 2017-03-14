package main

import (
	"log"
	"os"

	"flag"
	"fmt"

	"github.com/mitchellh/cli"
	"github.com/termbox/termbox/api/config"
)

func main() {
	c := cli.NewCLI("api", "1.0.0")
	c.Args = os.Args[1:]

	c.Commands = map[string]cli.CommandFactory{
		"": func() (cli.Command, error) {
			return RunCommand{cli: c}, nil
		},
	}

	exitStatus, err := c.Run()
	if err != nil {
		log.Println(err)
	}

	os.Exit(exitStatus)

}

type RunCommand struct {
	cli *cli.CLI
}

func (c RunCommand) Run(args []string) int {
	var configPath = flag.String("config", "", "config file path")

	cfg, err := config.ParseConfigFile(*configPath)
	if err != nil {
		fmt.Println(err)
		return 1
	}

	if err := New(cfg).Run(); err != nil {
		fmt.Println(err)
		return 1
	}
	return 0
}

func (c RunCommand) Help() string {
	return c.cli.HelpFunc(c.cli.Commands) + "\n"
}

func (c RunCommand) Synopsis() string {
	return ""
}
