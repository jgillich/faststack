package main

import (
	"termbox/api"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	api.Run()
}
