package models

import (
	enums "energy/models/enums"
	"gorm.io/gorm"
)

type Meter struct {
	gorm.Model
	Name string           `gorm:"notnull"`
	Type enums.MeterType `gorm:"notnull"`
}
