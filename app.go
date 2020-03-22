package main

import (
	"energy/controller"
	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg"
)

func main() {
	app := Application{}
	defer app.close()

	// Init application
	app.init()

	// Create database
	err := app.createDatabase()

	if err != nil {
		panic(err)
	}

	// Routes
	meterReadingController := controller.MeterReadingController{Db: app.db}
	app.router.GET("/meter-readings", meterReadingController.Index)

	// listen and serve on 0.0.0.0:8080
	app.run()
}

type Application struct {
	router *gin.Engine
	db     *pg.DB
}

func (app *Application) init() {
	app.db = pg.Connect(&pg.Options{
		User:     "energy",
		Database: "energy",
		Password: "energy",
	})

	// Create server with default middleware
	app.router = gin.Default()
}

func (app *Application) createDatabase() error {
	return nil
	//return app.db.CreateTable((*model.MeterReading)(nil), &orm.CreateTableOptions{})
}

func (app *Application) run() {
	app.router.Run()
}

func (app *Application) close() {
	app.db.Close()

}
