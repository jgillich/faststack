package command

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"syscall"

	"golang.org/x/crypto/ssh/terminal"
	"gopkg.in/urfave/cli.v2"

	"gitlab.com/faststack/billstack/api"
)

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

	req, err := json.Marshal(api.LoginRequest{
		Name:     username,
		Password: password,
	})
	if err != nil {
		return err
	}

	res, err := http.Post(c.String("billstack")+"/login", "application/json", bytes.NewBuffer(req))
	if err != nil {
		return err
	}

	switch res.StatusCode {
	case 200:
		var r api.Response
		if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
			return err
		}
		cfg := Config{
			Billstack:    c.String("billstack"),
			Machinestack: c.String("machinestack"),
			Token:        r.Data.(map[string]interface{})["token"].(string),
		}
		if err := saveConfig(cfg, c.String("config")); err != nil {
			return err
		}
		fmt.Println("Login successful!")
		return nil
	case 400:
		var r api.Response
		if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
			goto unexpected
		} else {
			return fmt.Errorf("error: %s", r.Message)
		}
	unexpected:
		fallthrough
	default:
		return fmt.Errorf("unexpected response: %s", res.Status)
	}
}
