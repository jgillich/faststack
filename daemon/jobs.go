package daemon

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/hyperhq/hyperd/utils"
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

		if !strings.HasPrefix(podName, "termbox") {
			continue
		}

		podInfo, err := a.Hyper.GetPodInfo(podID)
		if err != nil {
			a.Log.Error(err)
			continue
		}

		if time.Since(time.Unix(podInfo.CreatedAt, 0)) > time.Duration(a.Config.BoxDuration)*time.Hour {
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

func (a *Api) RemoveCustomImages() {
	a.Log.Info("Running job RemoveCustomImages")

	remoteInfo, err := a.Hyper.GetImages(true, true)
	if err != nil {
		a.Log.Error(err)
		return
	}

	images := remoteInfo.GetList("imagesList")
	for _, image := range images {
		fields := utils.RsplitN(image, ":", 5)
		date, _ := strconv.ParseUint(fields[3], 0, 64)

		a.Log.Info(fields[0])

		// keep library and official images
		if !strings.Contains(fields[0], "/") || strings.HasPrefix(fields[0], "termbox/") {
			continue
		}

		if time.Since(time.Unix(int64(date), 0)) < time.Duration(a.Config.BoxDuration+1)*time.Hour {
			continue
		}

		_, err := a.Hyper.RemoveImage(fields[2], false, false)
		if err != nil {
			a.Log.Error(err)
			continue
		}

		a.Log.Infof("Removed image %s", fields[0])
	}
}
