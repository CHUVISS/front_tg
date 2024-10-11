package repository

import (
	"fmt"
	"log"
	"myapp/internal/config"
	"myapp/internal/repository/admin"
	"myapp/internal/repository/channels"
	"myapp/internal/repository/parsing"
	"myapp/internal/repository/user"
	"myapp/internal/repository/views"
	"myapp/internal/repository/withdraw"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDB(config config.Config) *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=%s",
		config.DB.Host, config.DB.User, config.DB.Password, config.DB.DBName, config.DB.Port, config.DB.SSLMode)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Ошибка подключения к базе данных: %v", err)
	}

	err = db.AutoMigrate(&user.UserRepo{})
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate(&admin.AdminRepo{})
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(&channels.ChannelsRepo{})
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate(&withdraw.WithdrawRepo{})
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate(&views.ViewsRepo{})
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate(&parsing.ParsRepo{})
	if err != nil {
		panic(err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Ошибка получения DB из GORM: %v", err)
	}

	err = sqlDB.Ping()
	if err != nil {
		log.Fatalf("Ошибка проверки подключения к базе данных: %v", err)
	}
	return db
}
