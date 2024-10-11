package views

import (
	"time"

	"gorm.io/gorm"
)

func GetCountViews(channelId uint, db *gorm.DB) int64 {
	var totalAmount int64
	db.Model(&ViewsRepo{}).
		Where("channel_id = ?", channelId).
		Select("SUM(views_count)").
		Scan(&totalAmount)
	return totalAmount
}

func GetCountViewsDay(db *gorm.DB) (int64, error) {
	var total int64
	startOfDay := time.Now().Truncate(24 * time.Hour)
	endOfDay := startOfDay.Add(24 * time.Hour)

	err := db.Model(&ViewsRepo{}).
		Where("update_date >= ? AND update_date < ?", startOfDay, endOfDay).
		Select("SUM(views_count)").Scan(&total).Error

	return total, err
}

func GetCountViewsWeek(db *gorm.DB) (int64, error) {
	var totalViews int64
	oneWeekAgo := time.Now().AddDate(0, 0, -7)
	now := time.Now()

	result := db.Model(ViewsRepo{}).
		Where("update_date >= ? AND update_date <= ?", oneWeekAgo, now).
		Select("SUM(views_count)").
		Scan(&totalViews)

	// Проверка на ошибки
	if result.Error != nil {
		return 0, result.Error
	}

	return totalViews, nil
}

func GetChannelCountViewsWeek(channelId uint, db *gorm.DB) (*int64, error) {
	var totalViews *int64
	oneWeekAgo := time.Now().AddDate(0, 0, -7)
	now := time.Now()

	result := db.Model(ViewsRepo{}).
		Where("update_date >= ? AND update_date <= ?", oneWeekAgo, now).
		Select("SUM(views_count)").
		Scan(&totalViews)

	// Проверка на ошибки
	if result.Error != nil {
		return nil, result.Error
	}

	return totalViews, nil
}

func GetChannelCountViewsDay(channelId uint, db *gorm.DB) (*int64, error) {
	var total *int64
	startOfDay := time.Now().Truncate(24 * time.Hour)
	endOfDay := startOfDay.Add(24 * time.Hour)

	err := db.Model(&ViewsRepo{}).
		Where("update_date >= ? AND update_date < ? AND channel_id = ?", startOfDay, endOfDay, channelId).
		Select("SUM(views_count)").Scan(&total).Error

	return total, err
}

func GetChannelCountViewsMonth(channelId uint, db *gorm.DB) (*int64, error) {
	var total *int64

	now := time.Now()

	start := time.Date(now.Year(), now.Month()-1, 1, 0, 0, 0, 0, now.Location())
	end := start.AddDate(0, 1, 0)

	err := db.Model(&ViewsRepo{}).
		Where("update_date >= ? AND update_date < ? AND channel_id = ?", start, end, channelId).
		Select("SUM(views_count)").
		Scan(&total).Error

	if err != nil {
		return nil, err
	}

	return total, nil
}

func GetCountViewsMonth(db *gorm.DB) (int64, error) {
	var total int64

	now := time.Now()

	start := time.Date(now.Year(), now.Month()-1, 1, 0, 0, 0, 0, now.Location())
	end := start.AddDate(0, 1, 0)

	err := db.Model(&ViewsRepo{}).
		Where("update_date >= ? AND update_date < ?", start, end).
		Select("SUM(views_count)").
		Scan(&total).Error

	if err != nil {
		return 0, err
	}

	return total, nil
}
