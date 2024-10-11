package app

import (
	"log"
	"myapp/internal/config"
	"myapp/internal/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

type App struct {
	ServerEcho *echo.Echo
	DB         *gorm.DB
}

func NewApp() (*App, error) {
	app := &App{}
	app.ServerEcho = echo.New()
	conf, err := config.LoadConfig("internal/config")
	if err != nil {
		log.Fatalf("Ошибка загрузки конфигурации: %v", err)
	}
	app.DB = repository.InitDB(conf)
	return app, nil
}

func (a *App) Run() error {
	a.ServerEcho.Use(middleware.Logger())
	a.ServerEcho.Use(middleware.Recover())
	a.ServerEcho.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"}, // Разрешить запросы с этого источника
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))
	if err := a.ServerEcho.Start(":8080"); err != http.ErrServerClosed {
		log.Fatal(err)
	}
	return nil
}
