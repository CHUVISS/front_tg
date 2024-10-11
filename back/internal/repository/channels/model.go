package channels

import (
	"time"
)

func (ChannelsRepo) TableName() string {
	return "channel"
}

type ChannelsRepo struct {
	ID               uint      `gorm:"primarykey"`
	Url              string    `gorm:"type:varchar(512)"`
	Confirmed        bool      `gorm:"type:boolean"`
	ConfirmationDate time.Time `gorm:"type:timestamp"`
	UserId           int       `gorm:"type:int"`
	ChannelType      string    `gorm:"type:varchar(30)"`
}
