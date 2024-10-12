package channels

import (
	"fmt"
	"myapp/internal/model"
	"myapp/internal/repository/views"

	"gorm.io/gorm"
)

func CountChannels(userId uint, db *gorm.DB) int64 {
	var count int64
	result := db.Table("channel").Where("user_id = ? AND confirmed = ?", userId, true).Count(&count)

	if result.Error != nil {
		fmt.Println("Ошибка:", result.Error)
	}
	return count

}

func GetAllUserChannelsId(userId uint, db *gorm.DB) []uint {
	var ids []uint
	result := db.Table("channel").Where("user_id = ? and confirmed = ?", userId, true).Pluck("id", &ids)

	if result.Error != nil {
		fmt.Println("Ошибка:", result.Error)
	}
	return ids
}

func GetAllTypeChannelsId(channelType string, db *gorm.DB) []uint {
	var ids []uint
	result := db.Table("channel").Where("channel_type = ?", channelType).Pluck("id", &ids)

	if result.Error != nil {
		fmt.Println("Ошибка:", result.Error)
	}
	return ids
}

func CountViewsTypeChannels(ids []uint, db *gorm.DB) int64 {
	var countViews int64
	for _, v := range ids {
		count, err := views.GetCountViews(v, db)
		if err != nil {
			panic(err)
		}
		countViews += count
	}
	return countViews
}

func GetLink(id uint, typeChannel string, db *gorm.DB) string {
	var link string
	result := db.Table("channel").
		Where("id = ? AND channel_type = ?", id, typeChannel).
		Select("url").Scan(&link)
	if result.Error != nil {
		panic(result.Error.Error())
	}
	return link
}

func GetChannelType(id uint, db *gorm.DB) string {
	var typeChannel string
	result := db.Table("channel").
		Where("id = ?", id).
		Select("channel_type").Scan(&typeChannel)
	if result.Error != nil {
		panic(result.Error.Error())
	}
	return typeChannel
}

func GetAllUserChannels(userId uint, db *gorm.DB) map[string]map[uint]model.ChannelsInfo {
	// Инициализируем основную карту
	channel := make(map[string]map[uint]model.ChannelsInfo)

	// Получаем идентификаторы всех каналов пользователя
	channelsId := GetAllUserChannelsId(userId, db)
	for _, v := range channelsId {
		channelType := GetChannelType(v, db)

		// Проверяем, существует ли карта для данного типа канала, если нет, инициализируем её
		if _, exists := channel[channelType]; !exists {
			channel[channelType] = make(map[uint]model.ChannelsInfo)
		}

		// Получаем структуру для данного канала
		channelsInfo := channel[channelType][v]

		// Получаем количество просмотров и обрабатываем ошибки
		count, err := views.GetCountViews(v, db)
		if err != nil {
			panic(err) // Можно заменить panic на обработку ошибок
		}
		channelsInfo.CountViews = count
		channelsInfo.Url = GetLink(v, channelType, db)

		// Получаем дополнительные данные о просмотрах
		channelsInfo.CountDayViews, err = views.GetChannelCountViewsDay(v, db)
		if err != nil {
			panic(err) // Можно заменить panic на обработку ошибок
		}
		channelsInfo.CountMonthViews, err = views.GetChannelCountViewsMonth(v, db)
		if err != nil {
			panic(err) // Можно заменить panic на обработку ошибок
		}
		channelsInfo.CountWeekViews, err = views.GetChannelCountViewsWeek(v, db)
		if err != nil {
			panic(err) // Можно заменить panic на обработку ошибок
		}

		// Сохраняем обновленную информацию о канале
		channel[channelType][v] = channelsInfo
	}

	return channel
}
