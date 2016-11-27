package hyper

import (
	"github.com/hyperhq/hyperd/client"
	"github.com/hyperhq/hyperd/client/api"
)

type Hyper struct {
	cli *client.HyperClient
	api *api.Client
}

func New() *Hyper {
	return &Hyper{
		cli: client.NewHyperClient("unix", "/var/run/hyper.sock", nil),
		api: api.NewClient("unix", "/var/run/hyper.sock", nil),
	}
}

func (h *Hyper) PullImage(imageName string) error {
	return h.cli.PullImage(imageName)
}

func (h *Hyper) CreatePod(spec interface{}) (string, int, error) {
	return h.api.CreatePod(spec)
}
