package controllers

import (
	"myapp/internal/repository/user"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetAllUsers godoc
// @Summary      Get all users
// @Description  Получение списка всех пользователей.
// @Tags         users
// @Accept       json
// @Produce      json
// @Success      200    {object}  []model.UserInfo  "Список пользователей"
// @Router       /users/all [get]
func (h *Handler) GetAllUsers(c echo.Context) error {
	allnote := user.GetAll(h.repository)
	return c.JSON(http.StatusOK, allnote)

}
