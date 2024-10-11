package parsing

type ParsRepo struct {
	ID          uint   `gorm:"primaryKey"`
	Url         string `gorm:"type:varchar(512)"`
	TypeChannel string `gorm:"type:varchar(30)"`
}
