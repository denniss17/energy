package database

import (
	"github.com/denniss17/energy/api/models"
	"gorm.io/gorm"
)

func MigrateDb(db *gorm.DB) error {

	var err error

	err = db.AutoMigrate(&models.Meter{})
	if err != nil {
		return err
	}
	err = db.AutoMigrate(&models.MeterReading{})
	if err != nil {
		return err
	}

	return nil
}
