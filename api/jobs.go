package api

import (
	"fmt"
	"strings"
	"time"
)

func (a *Api) RemoveExpiredBoxes() {
	a.Log.Info("Running job RemoveExpiredBoxes")

	remoteInfo, err := a.Hyper.List("pod", "", "", true)
	if err != nil {
		a.Log.Error(err)
		return
	}

	for _, podData := range remoteInfo.GetList("podData") {
		fields := strings.Split(podData, ":")
		podID, podName := fields[0], fields[1]

		if podName != "termbox" {
			continue
		}

		podInfo, err := a.Hyper.GetPodInfo(podID)
		if err != nil {
			a.Log.Error(err)
			continue
		}

		if time.Since(time.Unix(podInfo.CreatedAt, 0)) > time.Hour {
			if err := a.Hyper.RmPod(podID); err != nil {
				a.Log.Error(err)
				continue
			}
			a.Log.Info("Expired ", podID)
		}

	}
}

func (a *Api) UpdateImages() {
	a.Log.Info("Running job UpdateImages")

	for _, image := range *a.Images {
		for _, version := range image.Versions {
			imageName := fmt.Sprintf("%s:%s", image.Image, version)
			a.Log.Info("Pulling image ", imageName)
			if err := a.HyperClient.PullImage(imageName); err != nil {
				a.Log.Error(err)
			}
		}
	}
}
