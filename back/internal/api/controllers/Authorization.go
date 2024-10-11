package controllers

import (
	"myapp/internal/model"
	"myapp/internal/repository/admin"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Authorization godoc
// @Summary Авторизация пользователя
// @Description Проверка авторизации пользователя по имени и паролю
// @Tags auth
// @Accept json
// @Produce json
// @Param user body model.Auth true "Данные авторизации"
// @Success 200 {object} map[string]string "Успешная авторизация"
// @Failure 400 {object} map[string]string "Некорректное имя или пароль, или ошибка ввода"
// @Router /auth [post]
func (h *Handler) Authorization(c echo.Context) error {
	u := new(model.Auth)
	if err := c.Bind(u); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid input"})
	}
	res := admin.Auth(u.Name, u.Password, h.repository)
	if res != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "incorrect name or password"})
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "success"})
}
