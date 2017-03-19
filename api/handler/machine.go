package handler

import (
	"fmt"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo"
)

func (h *Handler) CreateMachine(c echo.Context) error {

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JwtClaims)

	count, _ := h.redis.SCard(fmt.Sprintf("user:%s:machines", claims.Email)).Result()
	if int(count) >= claims.AppMetadata.Quota.Instances {
		return c.String(http.StatusMethodNotAllowed, "quota exceeded")
	}

	req := new(CreateMachineRequest)
	if err := c.Bind(req); err != nil {
		return err
	}

	if err := h.sched.Create(req.Name, req.Image, req.Driver); err != nil {
		return err
	}

	if err := h.redis.SAdd(fmt.Sprintf("user:%s:machines", req.Name)).Err(); err != nil {
		return err
	}

	return c.String(http.StatusCreated, "created")
}

func (h *Handler) DeleteMachine(c echo.Context) error {

	name := c.Param("name")
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JwtClaims)

	ok, err := h.redis.SIsMember(fmt.Sprintf("user:%s:machines", claims.Email), name).Result()
	if err != nil {
		return err
	}
	if !ok {
		return c.String(http.StatusBadRequest, fmt.Sprintf("machine '%s' does not exist for user '%s'", name, claims.Email))
	}

	if err := h.sched.Delete(name); err != nil {
		return err
	}

	return c.String(http.StatusOK, "deleted")
}

func (h *Handler) ExecMachine(c echo.Context) error {

	name := c.Param("name")
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JwtClaims)

	ok, err := h.redis.SIsMember(fmt.Sprintf("user:%s:machines", claims.Email), name).Result()
	if err != nil {
		return err
	}
	if !ok {
		return c.String(http.StatusBadRequest, fmt.Sprintf("machine '%s' does not exist for user '%s'", name, claims.Email))
	}

	upgrader := websocket.Upgrader{}

	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	// ...

	return nil
}
