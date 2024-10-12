package views

import (
	"database/sql"
	"time"

	"gorm.io/gorm"
)

func GetCountViews(channelId uint, db *gorm.DB) (int64, error) {
	var total sql.NullInt64
	err := db.Table("views").
		Where("channel_id = ?", channelId).
		Select("SUM(views_count)").
		Scan(&total).Error
	if err != nil {
		return 0, err
	}

	// Проверяем, есть ли значение
	if total.Valid {
		return total.Int64, nil // Возвращаем значение, если оно не NULL
	}

	return 0, nil // Если значение NULL, возвращаем 0
}

func GetCountViewsDay(db *gorm.DB) (int64, error) {
	var total sql.NullInt64
	startOfDay := time.Now().Truncate(24 * time.Hour)
	endOfDay := startOfDay.Add(24 * time.Hour)

	err := db.Table("views").
		Where("update_date >= ? AND update_date < ?", startOfDay, endOfDay).
		Select("SUM(views_count)").Scan(&total).Error

	if err != nil {
		return 0, err
	}

	// Проверяем, есть ли значение
	if total.Valid {
		return total.Int64, nil // Возвращаем значение, если оно не NULL
	}

	return 0, nil // Если значение NULL, возвращаем 0
}

func GetCountViewsWeek(db *gorm.DB) (int64, error) {
	var total sql.NullInt64
	oneWeekAgo := time.Now().AddDate(0, 0, -7)
	now := time.Now()

	err := db.Table("views").
		Where("update_date >= ? AND update_date <= ?", oneWeekAgo, now).
		Select("SUM(views_count)").
		Scan(&total).Error

	if err != nil {
		return 0, err
	}

	// Проверяем, есть ли значение
	if total.Valid {
		return total.Int64, nil // Возвращаем значение, если оно не NULL
	}

	return 0, nil // Если значение NULL, возвращаем 0
}

func GetChannelCountViewsWeek(channelId uint, db *gorm.DB) (int64, error) {
	var total sql.NullInt64
	oneWeekAgo := time.Now().AddDate(0, 0, -7)
	now := time.Now()

	err := db.Table("views").
		Where("update_date >= ? AND update_date <= ? AND channel_id = ?", oneWeekAgo, now, channelId).
		Select("SUM(views_count)").
		Scan(&total).Error

	if err != nil {
		return 0, err
	}

	// Проверяем, есть ли значение
	if total.Valid {
		return total.Int64, nil // Возвращаем значение, если оно не NULL
	}

	return 0, nil // Если значение NULL, возвращаем 0
}

func GetChannelCountViewsDay(channelId uint, db *gorm.DB) (int64, error) {
	var total sql.NullInt64
	// Получаем начало и конец предыдущего дня
	startOfDay := time.Now().Add(-24 * time.Hour).Truncate(24 * time.Hour)
	endOfDay := startOfDay.Add(24 * time.Hour)

	err := db.Table("views").
		Where("update_date >= ? AND update_date < ? AND channel_id = ?", startOfDay, endOfDay, channelId).
		Select("SUM(views_count)").Scan(&total).Error
	if err != nil {
		return 0, err
	}

	// Проверяем, есть ли значение
	if total.Valid {
		return total.Int64, nil // Возвращаем значение, если оно не NULL
	}

	return 0, nil // Если значение NULL, возвращаем 0
}

func GetChannelCountViewsMonth(channelId uint, db *gorm.DB) (int64, error) {
	var total sql.NullInt64

	now := time.Now()

	start := time.Date(now.Year(), now.Month()-1, 1, 0, 0, 0, 0, now.Location())
	end := start.AddDate(0, 1, 0)

	err := db.Table("views").
		Where("update_date >= ? AND update_date < ? AND channel_id = ?", start, end, channelId).
		Select("SUM(views_count)").
		Scan(&total).Error

	if err != nil {
		return 0, err
	}

	// Проверяем, есть ли значение
	if total.Valid {
		return total.Int64, nil // Возвращаем значение, если оно не NULL
	}

	return 0, nil // Если значение NULL, возвращаем 0
}

func GetCountViewsMonth(db *gorm.DB) (int64, error) {
	var total sql.NullInt64

	now := time.Now()

	start := time.Date(now.Year(), now.Month()-1, 1, 0, 0, 0, 0, now.Location())
	end := start.AddDate(0, 1, 0)

	err := db.Table("views").
		Where("update_date >= ? AND update_date < ?", start, end).
		Select("SUM(views_count)").
		Scan(&total).Error

	if err != nil {
		return 0, err
	}

	// Проверяем, есть ли значение
	if total.Valid {
		return total.Int64, nil // Возвращаем значение, если оно не NULL
	}

	return 0, nil // Если значение NULL, возвращаем 0
}
