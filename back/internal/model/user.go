package model

type UserConfirm struct {
	Username   string `json:"username" validate:"required"`
	UrlChannel string `json:"url_channel" validate:"required"`
}

type UserInfo struct {
	Username   string
	Channels   int
	Wallet     string
	Referrals  int
	CountViews int64
	Balance    int64
}
