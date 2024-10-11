package withdraw

import "time"

func (WithdrawRepo) TableName() string {
	return "withdraw"
}

type WithdrawRepo struct {
	ID               uint      `gorm:"primarykey"`
	Amount           int       `gorm:"type:int"`
	Confirmed        bool      `gorm:"type:boolean"`
	CreationDate     time.Time `gorm:"type:timestamp"`
	ChangeStatusDate time.Time `gorm:"type:timestamp"`
	UserId           int       `gorm:"type:int"`
}
