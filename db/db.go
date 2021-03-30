package db

import (
	"github.com/go-pg/pg/v9"
)

func InitDb() (*pg.DB, error) {
	var err error

	db := pg.Connect(&pg.Options{
		Addr:     "localhost:5434",
		User:     "energy",
		Database: "energy",
		Password: "energy",
	})

	return db, err
}
