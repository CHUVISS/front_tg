package controllers

import (
	"myapp/internal/repository/withdraw"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetAllWithdraw godoc
// @Summary Get all withdraw notes
// @Description Retrieves a list of all withdraw notes from the repository
// @Tags withdraw
// @Accept json
// @Produce json
// @Success 200 {array} model.WithdrawInfo "List of all withdraw notes"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /withdraw/all [get]
func (h *Handler) GetAllWithdraw(c echo.Context) error {
	allnote := withdraw.GetAll(h.repository)
	return c.JSON(http.StatusOK, allnote)

}
