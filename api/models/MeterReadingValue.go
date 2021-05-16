package models

type MeterReadingValue struct {
	BaseModel
	MeterReading   MeterReading `gorm:"notnull"`
	MeterReadingId uint         `gorm:"notnull"`
	Meter          Meter        `gorm:"notnull"`
	MeterId        uint         `gorm:"notnull"`
	Value          float64      `gorm:"notnull" json:"value"`
}
