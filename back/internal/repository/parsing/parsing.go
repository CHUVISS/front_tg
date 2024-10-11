package parsing

import (
	"myapp/internal/model"

	"gorm.io/gorm"
)

func InRepo(data model.ParsInfo, db *gorm.DB) error {
	pars := ParsRepo{
		Url:         data.Url,
		TypeChannel: data.TypeChannel,
	}
	result := db.Create(&pars)
	if result.Error != nil {
		return result.Error
	}
	return nil

}
