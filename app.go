package main

import (
	"energy/config"
	"energy/core"
	"log"
)

func main() {
	var err error

	app := &core.Application{}
	defer app.Close()

	log.Print("Initializing database")
	app.Db, err = config.InitDb()
	if err != nil {
		panic(err)
	}

	log.Print("Migrating database")
	err = config.MigrateDb(app.Db)
	if err != nil {
		panic(err)
	}

	log.Print("Initializing router")
	app.Router, err = config.InitRouter(app)
	if err != nil {
		panic(err)
	}

	err = app.Run()
	if err != nil {
		panic(err)
	}
}
