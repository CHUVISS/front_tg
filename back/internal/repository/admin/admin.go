package admin

import (
	"errors"

	"gorm.io/gorm"
)

func Auth(name string, password string, db *gorm.DB) error {
	var fromDB AdminRepo
	res := db.Model(AdminRepo{}).First(&fromDB)
	if res.Error != nil {
		panic(res.Error)
	}
	if fromDB.Login != name {
		return errors.New("неверное имя")
	}
	if fromDB.Password != password {
		return errors.New("неверный пароль")
	}
	return nil
}
