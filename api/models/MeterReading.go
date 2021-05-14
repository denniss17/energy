package models

import (
	"gorm.io/gorm"
	"time"
)

type MeterReading struct {
	gorm.Model
	Timestamp time.Time `gorm:"notnull"`
	Value     float64   `gorm:",notnull"`
}
