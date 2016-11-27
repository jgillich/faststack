package routes

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/hyperhq/runv/hypervisor/pod"
	"github.com/labstack/echo"
)

type createResponse struct {
	podID string
	error string
}

func (r *Routes) Create(c echo.Context) error {
	image := c.FormValue("image")
	if !imageAllowed(image) {
		return c.JSON(http.StatusBadRequest, createResponse{error: "invalid image"})
	}

	container := pod.UserContainer{
		Image: image,
	}

	pod := pod.UserPod{
		Containers: []pod.UserContainer{container},
		Resource:   pod.UserResource{Vcpu: 1, Memory: 256},
		Tty:        true,
	}

	podID, statusCode, err := r.Hyper.CreatePod(pod)
	if err != nil {
		log.Println(err, statusCode)
		return c.JSON(http.StatusInternalServerError, createResponse{error: "failed to create pod"})
	}

	return c.JSON(http.StatusOK, createResponse{podID: podID})
}

func imageAllowed(imageName string) bool {
	dat, err := ioutil.ReadFile("./config/images.json")
	if err != nil {
		log.Fatal(err)
	}

	var images []string
	err = json.Unmarshal([]byte(dat), &images)
	if err != nil {
		log.Fatal(err)
	}

	for _, i := range images {
		if i == imageName {
			return true
		}
	}
	return false
}
