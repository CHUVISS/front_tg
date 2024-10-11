package api

import (
	_ "myapp/docs"
	"myapp/internal/api/controllers"
	"myapp/internal/app"

	echoSwagger "github.com/swaggo/echo-swagger"
)

func RouteController(a *app.App) {
	handler := controllers.NewHandler(a.DB)

	a.ServerEcho.POST("/auth", handler.Authorization)

	//user
	a.ServerEcho.POST("/users/confirm", handler.ConfirmUser)
	a.ServerEcho.GET("/users/all", handler.GetAllUsers)
	a.ServerEcho.GET("/users", handler.GetUser)
	a.ServerEcho.GET("/users/views", handler.GetUserViewsChannels)

	//channel
	a.ServerEcho.GET("/channels/all", handler.GetAllViewsTypeAndWithdraw)

	//withdraw
	a.ServerEcho.GET("/withdraw/all", handler.GetAllWithdraw)
	a.ServerEcho.POST("/withdraw/confirm", handler.ConfirmWithdraw)
	a.ServerEcho.POST("/withdraw/cancel", handler.CancelWithdraw)

	//parsing
	a.ServerEcho.POST("/parsing/add", handler.ParsingAdd)

	a.ServerEcho.GET("/swagger/*", echoSwagger.WrapHandler)
}
