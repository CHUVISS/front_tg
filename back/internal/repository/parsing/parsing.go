package parsing

import (
	"myapp/internal/model"

	"gorm.io/gorm"
)

func InRepo(data model.ParsInfo, db *gorm.DB) error {
	pars := RequestedChannel{
		Url:         data.Url,
		TypeChannel: data.TypeChannel,
	}
	result := db.Create(&pars)
	if result.Error != nil {
		return result.Error
	}
	return nil

}

func Delet(channelType string, db *gorm.DB) error {
	result := db.Where("is_parsed = ? AND type_channel = ?", true, channelType).Delete(&RequestedChannel{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}
