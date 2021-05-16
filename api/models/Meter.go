package models

import (
	"github.com/denniss17/energy/api/models/enums"
)

type Meter struct {
	BaseModel
	Name string          `gorm:"notnull" json:"name"`
	Type enums.MeterType `gorm:"notnull" json:"type"`
}
