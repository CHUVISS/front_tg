package parsing

type RequestedChannel struct {
	ID          uint   `gorm:"primaryKey"`
	Url         string `gorm:"type:varchar(512)"`
	TypeChannel string `gorm:"type:varchar(30)"`
	IsParsed    bool   `gorm:"type:boolean" "default:true"`
	Views       int64  `gorm:"type:bigint"`
}
