package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"termbox/routes"

	"github.com/labstack/echo"
)

func main() {
	e := echo.New()
	r := routes.New()

	var images []string
	dat, err := ioutil.ReadFile("config/images.json")
	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal([]byte(dat), &images)
	if err != nil {
		log.Fatal(err)
	}

	for _, image := range images {
		err := r.Hyper.PullImage(image)
		if err != nil {
			log.Fatal(err)
		}
	}

	e.Static("/", "public")

	e.POST("/container", r.Create)
	e.POST("/attach", r.Attach)

	e.Logger.Fatal(e.Start(":8888"))
}
