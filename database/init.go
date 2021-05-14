package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func InitDb() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("data.db"), &gorm.Config{})

	return db, err
}
