package handler

import (
	"net/http"

	"github.com/faststackco/faststack/auth/model"
)

func (h *Handler) UserInfo(c AuthenticatedContext) error {
	var user model.User
	if err := h.db.Find(user, "name = ?", c.Claims.Name).Error; err != nil {
		return err
	}

	return c.JSON(http.StatusOK, user)
}
