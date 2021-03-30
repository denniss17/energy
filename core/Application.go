package core

import (
	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v9"
)

type Application struct {
	Router *gin.Engine
	Db     *pg.DB
}

func (app *Application) Run() error {
	return app.Router.Run()
}

func (app *Application) Close() error {
	return app.Db.Close()
}
