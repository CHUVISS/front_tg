package model

type Auth struct {
	Password string `json:"password" validate:"required"`
	Name     string `json:"name" validate:"required"`
}
