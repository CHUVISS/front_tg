package controllers

import (
	"myapp/internal/repository/channels"
	"myapp/internal/repository/user"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetUserViewsChannels godoc
// @Summary Get views for user channels
// @Description Retrieves the list of channels and their views for a specific user based on the provided username
// @Tags users
// @Accept json
// @Produce json
// @Param username query string true "Username of the user"
// @Success 200 {array} model.ChannelsInfo "List of channels with their views"
// @Failure 400 {object} map[string]string "Invalid username"
// @Failure 404 {object} map[string]string "User not found"
// @Router /users/views [get]
func (h *Handler) GetUserViewsChannels(c echo.Context) error {
	username := c.QueryParam("username")
	id, err := user.GetIdFromUsername(username, h.repository)
	if err != nil {
		panic(err)
	}
	channel := channels.GetAllUserChannels(id, h.repository)
	return c.JSON(http.StatusOK, channel)

}
