package repository

import (
	"fmt"
	"log"
	"myapp/internal/config"

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
