package handler

import (
	"net/http"
	"os"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/faststackco/faststack/auth/model"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	stripe "github.com/stripe/stripe-go"
)

func init() {
	stripe.Key = os.Getenv("STRIPE_KEY")
}

type Handler struct {
	db *gorm.DB
}

func NewHandler(db *gorm.DB) Handler {
	return Handler{db}
}

type AuthenticatedContext struct {
	echo.Context
	Claims Claims
}

type Claims struct {
	jwt.StandardClaims
	model.User
}

func AuthenticatedHandler(handler func(AuthenticatedContext) error) func(echo.Context) error {
	return func(c echo.Context) error {
		tokenString := c.Request().Header.Get(echo.HeaderAuthorization)
		if tokenString == "" {
			return c.String(http.StatusUnauthorized, "Authorization header missing")
		}

		token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte("TODO_SECRET"), nil
		})
		if err != nil {
			return err
		}

		aContext := AuthenticatedContext{c, token.Claims.(Claims)}

		return handler(aContext)
	}
}
