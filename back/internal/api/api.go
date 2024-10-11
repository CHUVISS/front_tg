package api

import (
	_ "myapp/docs"
	"myapp/internal/api/controllers"
	"myapp/internal/app"
	"myapp/service"

	echoSwagger "github.com/swaggo/echo-swagger"
)

func RouteController(a *app.App) {
	handler := controllers.NewHandler(a.DB)

	a.ServerEcho.POST("/auth", handler.Authorization)

	//user
	a.ServerEcho.POST("/users/confirm", handler.ConfirmUser, service.JWTMiddleware)
	a.ServerEcho.GET("/users/all", handler.GetAllUsers, service.JWTMiddleware)
	a.ServerEcho.GET("/users", handler.GetUser, service.JWTMiddleware)
	a.ServerEcho.GET("/users/views", handler.GetUserViewsChannels, service.JWTMiddleware)

	//channel
	a.ServerEcho.GET("/channels/all", handler.GetAllViewsTypeAndWithdraw, service.JWTMiddleware)

	//withdraw
	a.ServerEcho.GET("/withdraw/all", handler.GetAllWithdraw, service.JWTMiddleware)
	a.ServerEcho.POST("/withdraw/confirm", handler.ConfirmWithdraw, service.JWTMiddleware)
	a.ServerEcho.POST("/withdraw/cancel", handler.CancelWithdraw, service.JWTMiddleware)

	//parsing
	a.ServerEcho.POST("/parsing/add", handler.ParsingAdd, service.JWTMiddleware)
	a.ServerEcho.DELETE("/parsing/del/:channelType", handler.ParsingDelet, service.JWTMiddleware)

	a.ServerEcho.GET("/swagger/*", echoSwagger.WrapHandler)
}
