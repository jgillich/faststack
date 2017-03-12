package driver

import (
	"fmt"

	"github.com/lxc/lxd"
	"github.com/lxc/lxd/shared"
	"github.com/lxc/lxd/shared/api"
)

const (
	lxdConfigOption = "driver.lxc.enable"
)

type LxdDriver struct {
	client  *lxd.Client
	machine *Machine
}

func NewLxdDriver(ctx *DriverContext) (Driver, error) {

	remote := lxd.RemoteConfig{
		Addr:   ctx.Remote.String(),
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

	return &LxdDriver{client: client, machine: ctx.Machine}, nil
}

func (d *LxdDriver) Create() error {

	profiles := []string{"default"}

	imgremote, image := d.client.Config.ParseRemoteAndContainer(d.machine.Image)

	res, err := d.client.Init(d.machine.Name, imgremote, d.client.GetAlias(image), &profiles, nil, nil, true)
	if err != nil {
		return err
	}

	if err := d.client.WaitForSuccess(res.Operation); err != nil {
		return err
	}

	return nil
}

func (d *LxdDriver) Delete() error {

	container, err := d.client.ContainerInfo(d.machine.Name)
	if err != nil {
		return err
	}

	if container.StatusCode != 0 && container.StatusCode != api.Stopped {
		resp, err := d.client.Action(d.machine.Name, shared.Stop, -1, true, false)
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

	res, err := d.client.Delete(d.machine.Name)
	if err != nil {
		return err
	}

	if err := d.client.WaitForSuccess(res.Operation); err != nil {
		return err
	}

	return nil
}
