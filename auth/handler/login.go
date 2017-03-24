package handler

import (
	"fmt"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/faststackco/faststack/auth/model"
	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
	Name     string   `json:"name""`
	Email    string   `json:"email""`
	Password string   `json:"password""`
	Claims   []string `json:"claims"`
}

func (h *Handler) Login(c echo.Context) error {
	req := new(LoginRequest)
	if err := c.Bind(req); err != nil {
		return err
	}

	var user model.User

	if req.Email != "" && h.db.First(&user, "email = ?", req.Email).RecordNotFound() {
		return fmt.Errorf("user with email '%s' not found", req.Email)
	}
	if req.Name != "" && h.db.First(&user, "name = ?", req.Name).RecordNotFound() {
		return fmt.Errorf("user with name '%s' not found", req.Name)
	}

	if req.Email == "" && req.Name == "" {
		return fmt.Errorf("must provide email or name")
	}

	if bcrypt.CompareHashAndPassword(user.PasswordBcrypt, []byte(req.Password)) != nil {
		return fmt.Errorf("invalid password")
	}

	now := time.Now()

	claims := jwt.MapClaims{
		"name": user.Name,
		"exp":  now.Add(time.Hour * 48).Unix(),
		"nbf":  now.Truncate(time.Hour).Unix(),
		"iat":  now.Unix(),
	}

	for _, claim := range req.Claims {
		switch claim {
		case "email":
			claims["email"] = user.Email
		}
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte("TODO_SECRET"))
	if err != nil {
		return err
	}

	return c.String(http.StatusOK, tokenString)
}
