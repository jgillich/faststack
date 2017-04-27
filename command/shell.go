package command

import (
	"os"
	"syscall"

	"github.com/lxc/lxd/shared/termios"

	"gitlab.com/faststack/machinestack/client"
	"gopkg.in/urfave/cli.v2"
)

// Shell executes a command and attaches to its tty
func Shell(c *cli.Context) error {
	name := c.Args().Get(0)
	client := client.New(c.String("machinestack"), c.String("token"))

	return shell(client, name)
}

func shell(client *client.Client, name string) error {
	width, height, err := termios.GetSize(int(syscall.Stdout))
	if err != nil {
		return err
	}

	sessionID, err := client.SessionCreate(name, width, height)

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
