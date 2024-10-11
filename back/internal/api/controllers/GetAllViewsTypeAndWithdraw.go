package controllers

import (
	"myapp/internal/repository/channels"
	"myapp/internal/repository/views"
	"myapp/internal/repository/withdraw"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetAllViewsType godoc
// @Summary Get total views by channel type
// @Description Retrieves the total views for different types of channels (YouTube, TikTok, Instagram, Facebook)
// @Tags channels
// @Accept json
// @Produce json
// @Success 200 {object} map[string]int64 "Map of channel types and their total views"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /channels/all [get]
// @Security     BearerAuth
func (h *Handler) GetAllViewsTypeAndWithdraw(c echo.Context) error {
	channelsType := []string{"youtube", "tiktok", "instagram", "facebook"}
	view := make(map[string]int64)
	var sum int64
	for _, v := range channelsType {
		count := channels.CountViewsTypeChannels(channels.GetAllTypeChannelsId(v, h.repository), h.repository)
		view[v] = count
		sum += count
	}
	viewDay, err := views.GetCountViewsDay(h.repository)
	if err != nil {
		panic(err)
	}
	viewMonth, err := views.GetCountViewsMonth(h.repository)
	if err != nil {
		panic(err)
	}
	viewWeek, err := views.GetCountViewsWeek(h.repository)
	if err != nil {
		panic(err)
	}
	view["week_views"] = viewWeek
	view["day_views"] = viewDay
	view["month_views"] = viewMonth
	view["total_views"] = sum
	view["total_withdraw"] = withdraw.GetTotalAmount(h.repository)

	return c.JSON(http.StatusOK, view)
}
