package model

import "time"

type User struct {
	ID             int64     `json:"-"`
	StripeID       string    `json:"-"`
	StripeSubID    string    `json:"-"`
	Status         string    `json:"plan,omitempty"`
	Plan           string    `json:"plan,omitempty"`
	Name           string    `json:"name,omitempty" valid:"alphanum,length(4|20)"`
	EmailVerified  bool      `json:"email_verified"`
	Email          string    `json:"email,omitempty" valid:"email"`
	PasswordBcrypt []byte    `json:"-"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}
