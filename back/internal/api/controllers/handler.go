package controllers

import "gorm.io/gorm"

type Handler struct {
	repository *gorm.DB
}

func NewHandler(db *gorm.DB) *Handler {
	handler := &Handler{repository: db}
	return handler
}
