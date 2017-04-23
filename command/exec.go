package command

import (
	"os"

	"gitlab.com/faststack/machinestack/client"
	"gopkg.in/urfave/cli.v2"
)

// Exec executes a command and attaches to its tty
func Exec(c *cli.Context) error {
	name := c.Args().Get(0)

	client := client.New(c.String("machinestack"), c.String("token"))
	sessionID, err := client.SessionCreate(name)

	if err != nil {
		return err
	}

	return client.SessionIO(sessionID, os.Stdin, os.Stdout)
}
