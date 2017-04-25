package command

import (
	"os"

	"gitlab.com/faststack/machinestack/client"
	"gopkg.in/urfave/cli.v2"
)

// Shell executes a command and attaches to its tty
func Shell(c *cli.Context) error {
	name := c.Args().Get(0)

	client := client.New(c.String("machinestack"), c.String("token"))
	sessionID, err := client.SessionCreate(name)

	if err != nil {
		return err
	}

	control, err := client.SessionControl(sessionID)
	if err != nil {
		return err
	}

	go controlHandler(control)

	if err := client.SessionIO(sessionID, os.Stdin, os.Stdout); err != nil {
		return err
	}

	return nil
}
