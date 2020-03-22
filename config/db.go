package config

import (
	"github.com/go-pg/pg/v9"
)

func InitDb() (*pg.DB, error) {
	var err error

	db := pg.Connect(&pg.Options{
		User:     "energy",
		Database: "energy",
		Password: "energy",
	})

	//err = db.CreateTable((*model.MeterReading)(nil), &orm.CreateTableOptions{})

	return db, err
}
