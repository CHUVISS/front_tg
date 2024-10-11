package config

import (
	"fmt"

	"github.com/spf13/viper"
)

type Config struct {
	DB struct {
		Host     string
		Port     int
		User     string
		Password string
		DBName   string
		SSLMode  string
	}
}

func LoadConfig(path string) (config Config, err error) {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(path)

	if err := viper.ReadInConfig(); err != nil {
		return config, fmt.Errorf("не удалось прочитать файл конфигурации: %w", err)
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		return config, fmt.Errorf("не удалось расшифровать конфигурацию: %w", err)
	}

	return config, nil
}

var JwtKey = []byte("SECRET")
