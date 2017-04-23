package command

import (
	"os"

	"gopkg.in/urfave/cli.v2"

	"github.com/olekukonko/tablewriter"
	"gitlab.com/faststack/machinestack/client"
	"gitlab.com/faststack/machinestack/model"
)

// ListResponse is the data format of a list call
// TODO move to machinestack
type ListResponse struct {
	Data []model.Machine
}

// List lists all machines
func List(c *cli.Context) error {
	client := client.New(c.String("machinestack"), c.String("token"))
	machines, err := client.MachineList()

	if err != nil {
		return err
	}

	table := tablewriter.NewWriter(os.Stdout)
	table.SetHeader([]string{"Name", "Image"})

	for _, v := range machines {
		table.Append([]string{v.Name, v.Image})
	}
	table.Render()

	return nil
}
