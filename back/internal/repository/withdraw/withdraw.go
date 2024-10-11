package withdraw

import (
	"fmt"
	"myapp/internal/model"
	"myapp/internal/repository/user"
	"time"

	"gorm.io/gorm"
)

func GetAll(db *gorm.DB) []model.WithdrawInfo {
	allNote := make([]WithdrawRepo, 0)
	result := db.Find(&allNote)
	if result.Error != nil {
		panic(result.Error.Error())
	}
	return Map(allNote, db)
}

func GetTotalAmount(db *gorm.DB) int64 {
	var totalAmount int64
	db.Model(&WithdrawRepo{}).Select("SUM(amount)").Scan(&totalAmount)
	return totalAmount
}

func Confirm(userId uint, db *gorm.DB) error {
	location, err := time.LoadLocation("Europe/Moscow")
	if err != nil {
		fmt.Println("Ошибка загрузки временной зоны:", err)
		return err
	}
	var amount int64
	currentTime := time.Now().In(location)
	result := db.Model(&WithdrawRepo{}).
		Where("user_id = ?", userId).
		Updates(map[string]interface{}{
			"confirmed":          true,
			"change_status_date": currentTime,
		}).Select("amount").Scan(&amount)

	if result.Error != nil {
		return result.Error
	}
	err = user.UpdateBalance(userId, -amount, db)
	if err != nil {
		fmt.Println("Ошибка обновления баланса:", err)
		return err
	}

	return nil
}

func Cancel(userId uint, db *gorm.DB) error {
	location, err := time.LoadLocation("Europe/Moscow")
	if err != nil {
		fmt.Println("Ошибка загрузки временной зоны:", err)
		return err
	}
	var amount int64
	currentTime := time.Now().In(location)
	result := db.Model(&WithdrawRepo{}).
		Where("user_id = ?", userId).
		Updates(map[string]interface{}{
			"confirmed":          false,
			"change_status_date": currentTime,
		}).Select("amount").Scan(&amount)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func Map(vs []WithdrawRepo, db *gorm.DB) []model.WithdrawInfo {
	vsm := make([]model.WithdrawInfo, len(vs))
	for i, v := range vs {
		user, err := user.GetFromId(uint(v.UserId), db)
		if err != nil {
			panic(err)
		}
		vsm[i] = model.WithdrawInfo{
			Username:  user.Username,
			Amount:    int64(v.Amount),
			Wallet:    user.CryptoAddress,
			Confirmed: v.Confirmed,
		}
	}
	return vsm
}
