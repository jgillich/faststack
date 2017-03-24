package handler

import (
	"github.com/faststackco/faststack/auth/model"
	"github.com/labstack/echo"
	stripe "github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/event"
	"github.com/stripe/stripe-go/sub"
)

func (h *Handler) Webhook(c echo.Context) error {
	req := new(stripe.Event)
	if err := c.Bind(req); err != nil {
		return err
	}

	// to make sure the event is from stripe, we fetch it once again
	event, err := event.Get(req.ID, nil)
	if err != nil {
		return err
	}

	switch event.Type {
	case "customer.deleted":
		var user model.User
		if err := h.db.Delete(&user, "stripe_id = ?", event.UserID).Error; err != nil {
			return err
		}
	case "customer.subscription.updated":
		var user model.User
		if err := h.db.Find(&user, "stripe_id = ?", event.UserID).Error; err != nil {
			return err
		}
		subscription, err := sub.Get(user.StripeSubID, nil)
		if err != nil {
			return err
		}
		user.Status = string(subscription.Status)
	case "customer.subscription.deleted":
		var user model.User
		if err := h.db.Find(&user, "stripe_id = ?", event.UserID).Error; err != nil {
			return err
		}
		user.Status = "" // TODO
	case "invoice.payment_failed":
		// send email
	case "customer.subscription.trial_will_end":
		// send email
	case "customer.subscription.created":
		// send email
	}

	return nil
}
