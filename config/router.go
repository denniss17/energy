package config

import (
	"energy/controller"
	"energy/core"
	"github.com/gin-gonic/gin"
)

func InitRouter(app *core.Application) (*gin.Engine, error) {
	// Create server with default middleware
	router := gin.Default()

	// Create controllers
	meterReadingController := controller.MeterReadingController{App: app}

	// Create routes
	router.GET("/api/meter-readings", meterReadingController.Index)

	return router, nil
}
