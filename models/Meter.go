package models

import (
	"gorm.io/gorm"
)

type Meter struct {
	gorm.Model
	Name string `gorm:"notnull"`
	Type int    `gorm:"notnull"`
}
