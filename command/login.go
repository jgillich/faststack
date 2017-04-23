package command

import (
	"fmt"
	"syscall"

	"golang.org/x/crypto/ssh/terminal"
	"gopkg.in/urfave/cli.v2"

	"gitlab.com/faststack/billstack/client"
)

// Login asks for login credentials and retrieves token
func Login(c *cli.Context) error {
	fmt.Print("Username: ")
	var username string
	_, err := fmt.Scanln(&username)
	if err != nil {
		return err
	}

	fmt.Print("Password: ")
	bytePassword, err := terminal.ReadPassword(int(syscall.Stdin))
	if err != nil {
		return err
	}
	password := string(bytePassword)
	fmt.Printf("\n")

	client := client.New(c.String("machinestack"), "")
	token, err := client.Login(username, password)

	if err != nil {
		return err
	}

	config := ParseConfig(c)
	config.Token = token
	if err := config.save(c.String("config")); err != nil {
		return err
	}

	return nil
}
