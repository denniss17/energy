package database

import (
	"energy/models"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
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
