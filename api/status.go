package api

import "github.com/labstack/echo"
import "net/http"

type Status struct {
	apiOk      bool
	hyperOk    bool
	containers int
}

func (a *Api) GetStatus(c echo.Context) error {
	status := Status{apiOk: true}

	if env, err := a.Hyper.Info(); err == nil {
		status.hyperOk = true
		status.containers = env.GetInt("Containers")
	}

	return c.JSON(http.StatusOK, status)
}
