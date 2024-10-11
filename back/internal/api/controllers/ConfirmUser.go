package controllers

import (
	"myapp/internal/model"
	"myapp/internal/repository/user"
	"net/http"

	"github.com/labstack/echo/v4"
)

// ConfirmUser godoc
// @Summary Confirm a user channel
// @Description Confirms the user's channel by username and channel URL
// @Tags users
// @Accept  json
// @Produce  json
// @Param  body  body  model.UserConfirm  true  "User confirmation data"
// @Success 200 {object} map[string]string "confirmed"
// @Failure 400 {object} map[string]string "Invalid input or incorrect url/username"
// @Router /users/confirm [post]
func (h *Handler) ConfirmUser(c echo.Context) error {
	u := new(model.UserConfirm)
	if err := c.Bind(u); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid input"})
	}
	id, err := user.GetIdFromUsername(u.Username, h.repository)
	if err != nil {
		panic(err)
	}
	err = user.Confirm(id, u.UrlChannel, h.repository)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Incorrect url or username"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "confirmed"})
}
