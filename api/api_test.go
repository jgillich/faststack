package main

import (
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/faststackco/faststack/api/config"
	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
)

var (
	api         *Api
	machineJSON = `{"name":"faststack-TestCreateMachine","image":"ubuntu/xenial","driver":"lxd"}`
)

func TestMain(m *testing.M) {
	cfg := config.DefaultConfig()
	cfg.DriverConfig.Enable = append(cfg.DriverConfig.Enable, "lxd")
	cfg.DriverConfig.Options["lxd.remote"] = "unix://"
	api, _ = New(cfg)

	os.Exit(m.Run())
}

func TestCreateMachine(t *testing.T) {
	e := echo.New()

	req, err := http.NewRequest(echo.POST, "/machines", strings.NewReader(machineJSON))

	if assert.NoError(t, err) {
		req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
		rec := httptest.NewRecorder()
		c := e.NewContext(req, rec)

		if assert.NoError(t, api.createMachine(c)) {
			assert.Equal(t, http.StatusCreated, rec.Code)
			assert.Equal(t, machineJSON, rec.Body.String())
		}
	}
}
