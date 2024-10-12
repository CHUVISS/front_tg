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

func GetAllUserChannels(userId uint, db *gorm.DB) map[uint]model.ChannelsInfo {
	channel := make(map[uint]model.ChannelsInfo)

	channelsId := GetAllUserChannelsId(userId, db)
	fmt.Println(channelsId)
	for _, v := range channelsId {
		channelType := GetChannelType(v, db)

		if _, exists := channel[v]; !exists {
			channel[v] = model.ChannelsInfo{}
		}

		channelsInfo := channel[v]
		count, err := views.GetCountViews(v, db)
		if err != nil {
			panic(err)
		}
		channelsInfo.CountViews = count
		channelsInfo.Url = GetLink(v, channelType, db)
		channelsInfo.CountDayViews, err = views.GetChannelCountViewsDay(v, db)
		if err != nil {
			panic(err)
		}
		channelsInfo.CountMonthViews, err = views.GetChannelCountViewsMonth(v, db)
		if err != nil {
			panic(err)
		}
		channelsInfo.CountWeekViews, err = views.GetChannelCountViewsWeek(v, db)
		if err != nil {
			panic(err)
		}

		channel[v] = channelsInfo
	}

	return channel
}
