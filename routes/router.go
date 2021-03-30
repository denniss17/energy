package routes

import (
	"energy/controllers"
	"energy/core"
	"github.com/gin-gonic/gin"
)

func InitRouter(app *core.Application) (*gin.Engine, error) {
	// Create server with default middleware
	router := gin.Default()

	// Create controllers
	meterReadingController := controllers.MeterReadingController{App: app}

	// Create routes
	router.GET("/api/meter-readings", meterReadingController.Index)
	router.POST("/api/meter-readings", meterReadingController.Create)
	router.PUT("/api/meter-readings/:id", meterReadingController.Update)

	return router, nil
}
