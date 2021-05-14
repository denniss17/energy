package models

import (
	"github.com/denniss17/energy/api/models/enums"
	"gorm.io/gorm"
)

type Meter struct {
	gorm.Model
	Name string          `gorm:"notnull"`
	Type enums.MeterType `gorm:"notnull"`
}
