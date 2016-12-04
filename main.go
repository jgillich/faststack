package main

import (
	"github.com/joho/godotenv"
	"github.com/termbox/termbox/api"
)

func main() {
	godotenv.Load()
	api.New().Run()
}
