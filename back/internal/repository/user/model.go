package user

func (UserRepo) TableName() string {
	return "user"
}

type UserRepo struct {
	ID                    uint   `gorm:"primarykey"`
	TelegramId            int64  `gorm:"type:bigint"`
	Username              string `gorm:"type:varchar(128)"`
	IsBlocked             bool   `gorm:"type:boolean"`
	ViewsBalance          int64  `gorm:"type:bigint" validate:"gte=0"`
	CryptoAddress         string `gorm:"type:varchar(36)"`
	ReferralFirstLevelId  int64  `gorm:"type:bigint"`
	ReferralSecondLevelId int64  `gorm:"type:bigint"`
}
