package controllers

import (
	"github.com/denniss17/energy/api/container"
	"github.com/denniss17/energy/api/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type MeterReadingController struct {
	Context *container.ApplicationContext
}

func (controller MeterReadingController) Index(c *gin.Context) {
	var meterReadings []models.MeterReading

	result := controller.Context.Db.Preload("MeterReadingValues").Find(&meterReadings)

	if err := result.Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error", "details": err})
		return
	}

	if meterReadings == nil {
		meterReadings = make([]models.MeterReading, 0)
	}

	c.JSON(http.StatusOK, gin.H{"data": meterReadings})
}

func (controller MeterReadingController) Get(context *gin.Context) {
	//id, err := uuid.FromString(context.Param("id"))
	//
	//if err != nil {
	//	context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UUID", "details": err})
	//	return
	//}
	//
	//meterReading := &models.MeterReading{Id: id}
	//err = c.App.Db.Select(meterReading)
	//
	//if err != nil {
	//	context.JSON(http.StatusNotFound, gin.H{"error": "Not found", "details": err})
	//	return
	//}
	//
	//context.JSON(http.StatusOK, gin.H{"data": meterReading})
}

func (controller MeterReadingController) Create(context *gin.Context) {
	//var request *models.MeterReading
	//
	//if err := context.ShouldBindJSON(&request); err != nil {
	//	context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid format", "details": err})
	//	return
	//}
	//
	//err := c.App.Db.Insert(request)
	//if err != nil {
	//	log.WithError(err).Error("Unable to save MeterReading")
	//	context.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error", "details": err})
	//	return
	//}
	//
	//context.JSON(http.StatusCreated, nil)
}

func (controller MeterReadingController) Update(context *gin.Context) {
	//id, err := uuid.FromString(context.Param("id"))
	//
	//if err != nil {
	//	context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UUID", "details": err})
	//	return
	//}
	//
	//meterReading := &models.MeterReading{Id: id}
	//err = c.App.Db.Select(meterReading)
	//
	//if err != nil {
	//	context.JSON(http.StatusNotFound, gin.H{"error": "Not found", "details": err})
	//	return
	//}
	//
	//if err := context.ShouldBindJSON(&meterReading); err != nil {
	//	context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid format", "details": err})
	//	return
	//}
	//
	//meterReading.Id = id
	//
	//err = c.App.Db.Update(meterReading)
	//if err != nil {
	//	log.WithError(err).Error("Unable to save MeterReading")
	//	context.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error", "details": err})
	//	return
	//}
	//
	//context.JSON(http.StatusOK, gin.H{"data": meterReading})
}
