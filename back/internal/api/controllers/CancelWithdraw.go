package controllers

import (
	"myapp/internal/repository/user"
	"myapp/internal/repository/withdraw"
	"net/http"

	"github.com/labstack/echo/v4"
)

// ConfirmWithdraw godoc
// @Summary Confirm a withdrawal
// @Description Confirms a withdrawal for a specific user based on the provided username
// @Tags withdraw
// @Accept json
// @Produce json
// @Param username query string true "Username of the user whose withdrawal is being confirmed"
// @Success 200 {object} map[string]string "Confirmation message"
// @Failure 400 {object} map[string]string "Invalid username"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /withdraw/cancel [post]
func (h *Handler) CancelWithdraw(c echo.Context) error {
	username := c.QueryParam("username")
	id, err := user.GetIdFromUsername(username, h.repository)
	if err != nil {
		panic(err)
	}
	err = withdraw.Cancel(id, h.repository)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Incorrect username"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "cancel"})
}
