package controllers

import (
	"myapp/internal/repository/user"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetUser godoc
// @Summary Get user information
// @Description Retrieves information about a user based on the provided username
// @Tags users
// @Accept  json
// @Produce  json
// @Param  username  query  string  true  "Username of the user"
// @Success 200 {object} model.UserInfo "User information"
// @Failure 400 {object} map[string]string "Invalid username"
// @Failure 404 {object} map[string]string "User not found"
// @Router /users [get]
func (h *Handler) GetUser(c echo.Context) error {
	username := c.QueryParam("username")
	u := user.Get(username, h.repository)

	return c.JSON(http.StatusOK, u)

}
