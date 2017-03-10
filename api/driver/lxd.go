package driver

import (
	"fmt"

	"github.com/lxc/lxd"
	"github.com/lxc/lxd/shared"
	"github.com/lxc/lxd/shared/api"
	"github.com/termbox/termbox/api/types"
)

type LxdDriver struct {
	client *lxd.Client
}

func NewLxdDriver(ctx *DriverContext) (Driver, error) {

	remote := lxd.RemoteConfig{
		Addr:   ctx.remote,
		Static: true,
		Public: false,
	}

	lxdConfig := lxd.Config{
		Remotes:       map[string]lxd.RemoteConfig{"remote": remote},
		DefaultRemote: "remote",
	}

	client, err := lxd.NewClient(&lxdConfig, "remote")

	if err != nil {
		return nil, err
	}

	return &LxdDriver{client}, nil
}

func (d *LxdDriver) Name() string {
	return "lxd"
}

func (d *LxdDriver) Create(machine *types.Machine) error {

	profiles := []string{"default"}

	imgremote, image := d.client.Config.ParseRemoteAndContainer(machine.Image)

	res, err := d.client.Init(machine.Name, imgremote, d.client.GetAlias(image), &profiles, nil, nil, true)
	if err != nil {
		return err
	}

	if err := d.client.WaitForSuccess(res.Operation); err != nil {
		return err
	}

	return nil
}

func (d *LxdDriver) Delete(machine *types.Machine) error {

	container, err := d.client.ContainerInfo(machine.Name)
	if err != nil {
		return err
	}

	if container.StatusCode != 0 && container.StatusCode != api.Stopped {
		resp, err := d.client.Action(machine.Name, shared.Stop, -1, true, false)
		if err != nil {
			return err
		}

		op, err := d.client.WaitFor(resp.Operation)
		if err != nil {
			return err
		}

		if op.StatusCode == api.Failure {
			return fmt.Errorf("Stopping container failed!")
		}
	}

	res, err := d.client.Delete(machine.Name)
	if err != nil {
		return err
	}

	if err := d.client.WaitForSuccess(res.Operation); err != nil {
		return err
	}

	return nil
}
