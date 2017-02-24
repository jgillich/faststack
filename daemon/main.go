package daemon

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/urfave/cli"
)

func main() {
	godotenv.Load()

	app := cli.NewApp()
	app.Name = "termbox"
	app.Usage = "instant linux terminals"
	app.Version = "1.0.0"

	api := New()

	app.Action = func(c *cli.Context) error {
		api.Run()
		return nil
	}

	app.Commands = []cli.Command{
		{
			Name:  "api",
			Usage: "run the api server",
			Action: func(c *cli.Context) error {
				api.Run()
				return nil
			},
		},
		{
			Name:  "pull",
			Usage: "pull all images",
			Action: func(c *cli.Context) error {
				api.UpdateImages()
				return nil
			},
		},
		{
			Name:  "remove",
			Usage: "remove expired boxes and image",
			Action: func(c *cli.Context) error {
				api.RemoveExpiredBoxes()
				api.RemoveCustomImages()
				return nil
			},
		},
	}

	app.Run(os.Args)
}
