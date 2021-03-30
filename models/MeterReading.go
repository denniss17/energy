package models

import (
	"context"
	"github.com/go-pg/pg/v9"
	"github.com/satori/go.uuid"
	"time"
)

type MeterReading struct {
	Id         uuid.UUID `pg:",pk,type:uuid" json:"id"`
	Timestamp  time.Time `pg:",notnull" json:"timestamp"`
	EnergyHigh int       `pg:",notnull" json:"energyHigh" binding:"required" validate:"required"`
	EnergyLow  int       `pg:",notnull" json:"energyLow" binding:"required" validate:"required"`
	Gas        int       `pg:",notnull" json:"gas" binding:"required" validate:"required"`
	Water      float64   `pg:",notnull" json:"water" binding:"required" validate:"required"`
}

// Compiletime typechecking
var _ pg.BeforeInsertHook = (*MeterReading)(nil)

func (meterReading *MeterReading) BeforeInsert(context context.Context) (context.Context, error) {
	meterReading.Id = uuid.NewV4()
	if meterReading.Timestamp.IsZero() {
		meterReading.Timestamp = time.Now()
	}

	return context, nil
}
