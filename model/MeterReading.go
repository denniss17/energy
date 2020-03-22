package model

import (
	"time"
)

type MeterReading struct {
	Id         int
	Timestamp  time.Time
	EnergyHigh int
	EnergyLow  int
	Gas        int
	Water      float64
}
