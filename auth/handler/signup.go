package handler

import (
	"fmt"
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/faststackco/faststack/auth/model"
	"github.com/labstack/echo"
	stripe "github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/customer"
	"golang.org/x/crypto/bcrypt"
)

type SignUpRequest struct {
	Password string `json:"password" valid:"stringlength(8|100),required"`
	Name     string `json:"name" valid:"alphanum,stringlength(4|20),required"`
	Email    string `json:"email" valid:"email,required"`
	Token    string `json:"token"`
}

func (h *Handler) SignUp(c echo.Context) error {
	req := new(SignUpRequest)
	if err := c.Bind(req); err != nil {
		return err
	}

	_, err := govalidator.ValidateStruct(req)
	if err != nil {
		return err
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user := model.User{
		Email:          req.Email,
		Name:           req.Name,
		PasswordBcrypt: hash,
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}

	_, err = govalidator.ValidateStruct(user)
	if err != nil {
		return err
	}

	if !h.db.First(&model.User{}, "email = ?", user.Email).RecordNotFound() {
		return fmt.Errorf("user with email '%s' exists", user.Email)
	}
	if !h.db.First(&model.User{}, "name = ?", user.Name).RecordNotFound() {
		return fmt.Errorf("user with name '%s' exists", user.Name)
	}

	params := &stripe.CustomerParams{
		Email:  user.Email,
		Source: &stripe.SourceParams{Token: req.Token},
	}
	customer, err := customer.New(params)
	if err != nil {
		return err
	}
	user.StripeID = customer.ID

	if err := h.db.Create(&user).Error; err != nil {
		return err
	}

	return c.String(http.StatusCreated, "created")
}
