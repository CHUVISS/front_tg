package controllers

import (
	"myapp/internal/repository/parsing"
	"net/http"

	"github.com/labstack/echo/v4"
)

// ParsingDelet godoc
// @Summary Удаление записей по типу канала
// @Description Удаляет все записи, где isParsed=true и channel_type соответствует переданному параметру.
// @Tags parsing
// @Accept json
// @Produce json
// @Param channelType path string true "Тип канала"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Router /parsing/del/{channelType} [delete]
// @Security     BearerAuth
func (h *Handler) ParsingDelet(c echo.Context) error {
	channelType := c.Param("channelType")
	res := parsing.Delet(channelType, h.repository)
	if res != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "incorrect type"})
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "success"})
}
