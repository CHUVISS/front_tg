package controllers

import (
	"myapp/internal/model"
	"myapp/internal/repository/parsing"
	"net/http"

	"github.com/labstack/echo/v4"
)

// ParsingAdd godoc
// @Summary Add parsing information
// @Description Adds parsing information to the repository
// @Tags parsing
// @Accept json
// @Produce json
// @Param data body model.ParsInfo true "Parsing Information"
// @Success 200 {object} map[string]string "Success message"
// @Failure 400 {object} map[string]string "Invalid input or incorrect name/password"
// @Router /parsing/add [post]
func (h *Handler) ParsingAdd(c echo.Context) error {
	u := new(model.ParsInfo)
	if err := c.Bind(u); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid input"})
	}
	res := parsing.InRepo(*u, h.repository)
	if res != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "incorrect name or password"})
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "success"})
}
