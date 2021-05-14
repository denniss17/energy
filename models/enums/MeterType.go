package enums

import "database/sql/driver"

type MeterType string

const (
	Electricity MeterType = "electricity"
	Gas         MeterType = "gas"
	Water       MeterType = "water"
)

func (meterType *MeterType) Scan(value interface{}) error {
	*meterType = MeterType(value.(string))
	return nil
}

func (meterType MeterType) Value() (driver.Value, error) {
	return string(meterType), nil
}
