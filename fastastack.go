package main

import (
	"fmt"
	"os"
	"os/user"

	"github.com/faststackco/faststack/command"
	"gopkg.in/urfave/cli.v2"
	"gopkg.in/urfave/cli.v2/altsrc"
)

func main() {
	user, _ := user.Current()

	app := &cli.App{
		Name:    "faststack",
		Usage:   "On-demand Linux workspaces",
		Version: "1.0.0",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:  "config",
				Usage: "configuration path",
				Value: fmt.Sprintf("%s/%s", user.HomeDir, ".config/faststack/config.yml"), // TODO make cross platform
			},
			altsrc.NewStringFlag(&cli.StringFlag{
				Name:   "machinestack",
				Usage:  "Set the machinestack url",
				Value:  "http://localhost:9610",
				Hidden: true,
			}),
			altsrc.NewStringFlag(&cli.StringFlag{
				Name:   "billstack",
				Usage:  "Set the billstack url",
				Value:  "http://localhost:9620",
				Hidden: true,
			}),
			altsrc.NewStringFlag(&cli.StringFlag{
				Name:   "token",
				Usage:  "Set the authorization token",
				Hidden: true,
			}),
		},
		Commands: []*cli.Command{
			{
				Name:   "login",
				Usage:  "Login with your username and password",
				Action: command.Login,
			},
			{
				Name:   "list",
				Usage:  "List your machines",
				Action: command.List,
			},
		},
	}
	//app.Before = func(c *cli.Context) error {
	//	altsrc.InitInputSourceWithContext(app.Flags, altsrc.NewYamlSourceFromFlagFunc("config"))(c)
	//	return nil
	//}
	app.Before = altsrc.InitInputSourceWithContext(app.Flags, altsrc.NewYamlSourceFromFlagFunc("config"))

	app.Run(os.Args)
}
