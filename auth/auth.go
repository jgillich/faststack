package main

import (
	"github.com/faststackco/faststack/auth/handler"
	"github.com/faststackco/faststack/auth/model"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/labstack/echo"
)

func main() {

	db, err := model.Db("sqlite", "foo.db")
	if err != nil {
		panic("failed to connect database")
	}

	h := handler.NewHandler(db)

	e := echo.New()

	e.POST("/signup", h.SignUp)
	e.POST("/login", h.LoginUser)
	e.POST("/webhook", h.Webhook)
	e.POST("/subscribe", handler.AuthenticatedHandler(h.Subscribe))
	e.GET("/userinfo", handler.AuthenticatedHandler(h.UserInfo))

	e.Start(":1234")
}
