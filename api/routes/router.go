package routes

import (
	"energy/container"
	"energy/controllers"
	"github.com/gin-gonic/gin"
)

func InitRouter(applicationContext *container.ApplicationContext) (*gin.Engine, error) {
	// Create server with default middleware
	router := gin.Default()

	// Create controllers
	meterController := controllers.MeterController{Context: applicationContext}
	meterReadingController := controllers.MeterReadingController{Context: applicationContext}

	// Create routes
	router.GET("/api/meters", meterController.Index)
	router.POST("/api/meters", meterController.Create)

	router.GET("/api/meter-readings", meterReadingController.Index)
	router.POST("/api/meter-readings", meterReadingController.Create)
	router.PUT("/api/meter-readings/:id", meterReadingController.Update)

	return router, nil
}
