package views

import "time"

func (ViewsRepo) TableName() string {
	return "views"
}

type ViewsRepo struct {
	ID         uint      `gorm:"primarykey"`
	ViewsCount int64     `gorm:"type:bigint"`
	UpdateDate time.Time `gorm:"type:date"`
	ChannelId  uint      `gorm:"type:int"`
}
