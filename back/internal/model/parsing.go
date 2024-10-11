package model

type ParsInfo struct {
	Url         string `json:"url" validate:"required"`
	TypeChannel string `json:"type_channel" validate:"required"`
}
