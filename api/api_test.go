package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
)

var (
	api         = New()
	machineJSON = `{"name":"termbox-test","image":"ubuntu:16.04","command":""}`
)

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
