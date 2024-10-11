package admin

func (AdminRepo) TableName() string {
	return "admin"
}

type AdminRepo struct {
	ID       uint   `gorm:"primaryKey"`
	Password string `gorm:"type:varchar(100)"`
	Login    string `gorm:"type:varchar(100)"`
}
