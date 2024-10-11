package views

import "gorm.io/gorm"

func GetCountViews(channelId uint, db *gorm.DB) int64 {
	var totalAmount int64
	db.Model(&ViewsRepo{}).
		Where("channel_id = ?", channelId).
		Select("SUM(views_count)").
		Scan(&totalAmount)
	return totalAmount
}
