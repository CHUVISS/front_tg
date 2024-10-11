package user

import (
	"fmt"
	"myapp/internal/model"
	"myapp/internal/repository/channels"
	"myapp/internal/repository/views"
	"time"

	"gorm.io/gorm"
)

func Confirm(userId uint, urlChannel string, db *gorm.DB) error {
	location, err := time.LoadLocation("Europe/Moscow")
	if err != nil {
		fmt.Println("Ошибка загрузки временной зоны:", err)
		return err
	}

	currentTime := time.Now().In(location)
	result := db.Model(&channels.ChannelsRepo{}).
		Where("user_id = ? AND url = ?", userId, urlChannel).
		Updates(map[string]interface{}{
			"confirmed":         true,
			"confirmation_date": currentTime,
		})

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func UpdateBalance(id uint, value int64, db *gorm.DB) error {
	result := db.Model(&UserRepo{}).Where("id = ?", id).Update("views_balance", gorm.Expr("views_balance + ?", value))
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func GetAllViews(ids []uint, db *gorm.DB) int64 {
	var totalAmount int64
	for _, i := range ids {
		totalAmount += views.GetCountViews(i, db)
	}
	return totalAmount

}

func Get(username string, db *gorm.DB) model.UserInfo {
	var user UserRepo
	result := db.Where("username = ?", username).First(&user)
	if result.Error != nil {
		panic(result.Error.Error())
	}
	id, err := GetIdFromUsername(user.Username, db)
	if err != nil {
		panic(err)
	}
	telegId, err := GetTelegramIdFromUsername(user.Username, db)
	if err != nil {
		panic(err)
	}
	channelsId := channels.GetAllUserChannelsId(id, db)
	return model.UserInfo{
		Username:   user.Username,
		Channels:   int(channels.CountChannels(id, db)),
		Wallet:     user.CryptoAddress,
		Referrals:  int(CountReferrals(telegId, db)),
		CountViews: int64(GetAllViews(channelsId, db)),
		Balance:    user.ViewsBalance,
	}

}

func GetAll(db *gorm.DB) []model.UserInfo {
	var AllNote = make([]UserRepo, 0)
	result := db.Find(&AllNote)
	if result.Error != nil {
		panic(result.Error.Error())
	}
	return Map(AllNote, db)

}

func CountReferrals(telegramId int64, db *gorm.DB) int64 {
	var count int64
	result := db.Model(&UserRepo{}).Where("referral_first_level_id = ?", telegramId).Count(&count)

	if result.Error != nil {
		fmt.Println("Ошибка:", result.Error)
	}
	return count
}

func GetFromId(id uint, db *gorm.DB) (*UserRepo, error) {
	var u UserRepo
	result := db.Where("id = ?", id).First(&u)
	if result.Error != nil {
		return nil, result.Error
	}
	return &u, nil
}

func GetTelegramIdFromUsername(username string, db *gorm.DB) (int64, error) {
	var u UserRepo
	result := db.Where("username = ?", username).First(&u)
	if result.Error != nil {
		return 0, result.Error
	}

	return u.TelegramId, nil
}

func GetIdFromUsername(username string, db *gorm.DB) (uint, error) {
	var u UserRepo
	result := db.Where("username = ?", username).First(&u)
	if result.Error != nil {
		return 0, result.Error
	}

	return u.ID, nil
}

func Map(vs []UserRepo, db *gorm.DB) []model.UserInfo {
	vsm := make([]model.UserInfo, len(vs))
	for i, v := range vs {
		id, err := GetIdFromUsername(v.Username, db)
		if err != nil {
			panic(err)
		}
		telegId, err := GetTelegramIdFromUsername(v.Username, db)
		if err != nil {
			panic(err)
		}
		channelsId := channels.GetAllUserChannelsId(id, db)
		user := model.UserInfo{
			Username:   v.Username,
			Channels:   int(channels.CountChannels(id, db)),
			Wallet:     v.CryptoAddress,
			Referrals:  int(CountReferrals(telegId, db)),
			CountViews: int64(GetAllViews(channelsId, db)),
			Balance:    v.ViewsBalance,
		}
		vsm[i] = user
	}
	return vsm
}
