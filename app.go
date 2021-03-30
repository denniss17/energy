package main

import (
	"energy/core"
	"energy/db"
	"energy/routes"
	"log"
)

func main() {
	var err error

	app := &core.Application{}
	defer app.Close()

	log.Print("Initializing database")
	if app.Db, err = db.InitDb(); err != nil {
		panic(err)
	}

	log.Print("Migrating database")
	if err = db.MigrateDb(app.Db); err != nil {
		panic(err)
	}

	log.Print("Initializing router")
	if app.Router, err = routes.InitRouter(app); err != nil {
		panic(err)
	}

	if err = app.Run(); err != nil {
		panic(err)
	}
}
