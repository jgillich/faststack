package handler

import (
	"net/http"

	"github.com/faststackco/faststack/auth/model"
	stripe "github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/sub"
)

type SubscribeRequest struct {
	Plan string `json:"plan"`
}

func (h *Handler) Subscribe(c AuthenticatedContext) error {
	req := new(SubscribeRequest)
	if err := c.Bind(req); err != nil {
		return err
	}

	var user model.User
	if err := h.db.Find(user, "name = ?", c.Claims.Name).Error; err != nil {
		return err
	}

	params := &stripe.SubParams{
		Customer: user.StripeID,
		Plan:     req.Plan,
	}

	var subscription *stripe.Sub
	var err error
	if user.StripeID != "" {
		subscription, err = sub.Update(user.StripeID, params)
	} else {
		subscription, err = sub.New(params)
	}
	if err != nil {
		return err
	}

	user.StripeSubID = subscription.ID
	user.Status = string(subscription.Status)
	user.Plan = req.Plan
	if err := h.db.Update(&user).Error; err != nil {
		return err
	}

	return c.String(http.StatusOK, "subscribed")
}
