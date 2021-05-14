package core

import (
	"fmt"
	"github.com/denniss17/energy/api/container"
	"github.com/denniss17/energy/api/database"
	"github.com/denniss17/energy/api/routes"
	"log"
)

type Application struct {
	Context *container.ApplicationContext
}

func (app *Application) Init() error {
	var err error

	app.Context = &container.ApplicationContext{}

	log.Print("Initializing database")
	if app.Context.Db, err = database.InitDb(); err != nil {
		return fmt.Errorf("failed to initialize database: %w", err)
	}

	log.Print("Migrating database")
	if err = database.MigrateDb(app.Context.Db); err != nil {
		return fmt.Errorf("failed to migrate database: %w", err)
	}

	log.Print("Initializing router")
	if app.Context.Router, err = routes.InitRouter(app.Context); err != nil {
		return fmt.Errorf("failed to initialize router: %w", err)
	}

	return nil
}

func (app *Application) Run() error {
	return app.Context.Router.Run()
}

func (app *Application) Close() error {
	// No-op
	return nil
}
