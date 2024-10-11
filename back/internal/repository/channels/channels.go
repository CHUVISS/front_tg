package channels

import (
	"fmt"
	"myapp/internal/model"
	"myapp/internal/repository/views"

	"gorm.io/gorm"
)

func CountChannels(userId uint, db *gorm.DB) int64 {
	var count int64
	result := db.Model(&ChannelsRepo{}).Where("user_id = ? AND confirmed = ?", userId, true).Count(&count)

	if result.Error != nil {
		fmt.Println("Ошибка:", result.Error)
	}
	return count

}

func GetAllUserChannelsId(userId uint, db *gorm.DB) []uint {
	var ids []uint
	result := db.Model(&ChannelsRepo{}).Where("user_id = ? and confirmed = ?", userId, true).Pluck("id", &ids)

	if result.Error != nil {
		fmt.Println("Ошибка:", result.Error)
	}
	return ids
}

func GetAllTypeChannelsId(channelType string, db *gorm.DB) []uint {
	var ids []uint
	result := db.Model(&ChannelsRepo{}).Where("channel_type = ?", channelType).Pluck("id", &ids)

	if result.Error != nil {
		fmt.Println("Ошибка:", result.Error)
	}
	return ids
}

func CountViewsTypeChannels(ids []uint, db *gorm.DB) int64 {
	var countViews int64
	for _, v := range ids {
		countViews += views.GetCountViews(v, db)
	}
	return countViews
}

func GetLink(id uint, typeChannel string, db *gorm.DB) string {
	var link string
	result := db.Model(ChannelsRepo{}).
		Where("id = ? AND channel_type = ?", id, typeChannel).
		Select("url").Scan(&link)
	if result.Error != nil {
		panic(result.Error.Error())
	}
	return link
}

func GetChannelType(id uint, db *gorm.DB) string {
	var typeChannel string
	result := db.Model(ChannelsRepo{}).
		Where("id = ?", id).
		Select("channel_type").Scan(&typeChannel)
	if result.Error != nil {
		panic(result.Error.Error())
	}
	return typeChannel
}

func GetAllUserChannels(userId uint, db *gorm.DB) map[string]model.ChannelsInfo {
	channel := make(map[string]model.ChannelsInfo)

	channelsId := GetAllUserChannelsId(userId, db)

	for _, v := range channelsId {
		channelType := GetChannelType(v, db)

		if _, exists := channel[channelType]; !exists {
			channel[channelType] = model.ChannelsInfo{}
		}

		channelsInfo := channel[channelType]
		channelsInfo.CountViews = views.GetCountViews(v, db)
		channelsInfo.Url = GetLink(v, channelType, db)

		channel[channelType] = channelsInfo
	}

	return channel
}
