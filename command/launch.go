package command

import (
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

	created, err := client.MachineCreate(&machine)
	if err != nil {
		return err
	}

	if !c.Bool("noattach") {
		err = shell(client, created.Name)
	}

	if c.Bool("rm") {
		if err := client.MachineDelete(machine.Name); err != nil {
			return err
		}
	}

	return err
}
