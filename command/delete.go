package command

import (
	"fmt"

	"gitlab.com/faststack/machinestack/client"
	"gopkg.in/urfave/cli.v2"
)

// Delete deletes a machine
func Delete(c *cli.Context) error {
	name := c.Args().Get(0)
	client := client.New(c.String("machinestack"), c.String("token"))
	if err := client.MachineDelete(name); err != nil {
		return err
	}

	fmt.Printf("Machine '%v' was deleted.", name)

	return nil
}
