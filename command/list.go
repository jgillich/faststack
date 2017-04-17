package command

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"gopkg.in/urfave/cli.v2"

	"github.com/olekukonko/tablewriter"
	"gitlab.com/faststack/billstack/api"
	"gitlab.com/faststack/machinestack/model"
)

type ListResponse struct {
	Data []model.Machine
}

func List(c *cli.Context) error {

	req, err := http.NewRequest("GET", c.String("machinestack")+"/machines", nil)
	if err != nil {
		return err
	}
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", c.String("token")))

	res, err := http.DefaultClient.Do(req)

	switch res.StatusCode {
	case 200:
		var r ListResponse
		if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
			return err
		}

		table := tablewriter.NewWriter(os.Stdout)
		table.SetHeader([]string{"Name", "Image"})

		for _, v := range r.Data {
			table.Append([]string{v.Name, v.Image})
		}
		table.Render()
		return nil
	default:
		var r api.Response
		if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
			goto unexpected
		} else {
			return fmt.Errorf("error: %s", r.Message)
		}
	unexpected:
		return fmt.Errorf("unexpected response: %s", res.Status)
	}
}
