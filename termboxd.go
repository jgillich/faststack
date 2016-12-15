package main

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/termbox/termbox/api"
	"github.com/urfave/cli"
)

func main() {
	godotenv.Load()

	app := cli.NewApp()
	app.Name = "termbox"
	app.Usage = "instant linux terminals"
	app.Version = "1.0.0"

	app.Action = func(c *cli.Context) error {
		api.New().Run()
		return nil
	}

	app.Commands = []cli.Command{
		{
			Name:  "api",
			Usage: "run the api server",
			Action: func(c *cli.Context) error {
				api.New().Run()
				return nil
			},
		},
		{
			Name:  "pull",
			Usage: "pull all images",
			Action: func(c *cli.Context) error {
				api.New().UpdateImages()
				return nil
			},
		},
		{
			Name:  "remove",
			Usage: "remove expired boxes",
			Action: func(c *cli.Context) error {
				api.New().RemoveExpiredBoxes()
				return nil
			},
		},
	}

	app.Run(os.Args)
}
