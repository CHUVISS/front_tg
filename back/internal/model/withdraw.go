package model

type WithdrawInfo struct {
	Username  string
	Amount    int64
	Wallet    string
	Confirmed bool
}
