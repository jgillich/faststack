package command

import (
	"os"

	"gitlab.com/faststack/machinestack/client"
	"gitlab.com/faststack/machinestack/model"
	"gopkg.in/urfave/cli.v2"
)

// Launch launches a new machine
func Launch(c *cli.Context) error {
	machine := model.Machine{
		Image:  c.Args().Get(0),
		Name:   c.String("name"),
		Driver: "lxd",
	}

	client := client.New(c.String("machinestack"), c.String("token"))

	if err := client.MachineCreate(&machine); err != nil {
		return err
	}

	sessionID, err := client.SessionCreate(machine.Name)
	if err != nil {
		return err
	}

	if !c.Bool("noattach") {
		if err := client.SessionIO(sessionID, os.Stdin, os.Stdout); err != nil {
			return err
		}
	}

	if c.Bool("rm") {
		if err := client.MachineDelete(machine.Name); err != nil {
			return err
		}
	}

	return nil
}
