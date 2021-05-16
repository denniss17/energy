package models

import (
	"time"
)

type MeterReading struct {
	BaseModel
	Timestamp          time.Time           `gorm:"notnull"`
	MeterReadingValues []MeterReadingValue `json:"meter_reading_values"`
}
