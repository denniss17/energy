package controllers

import (
	"energy/core"
	"energy/models"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
	log "github.com/sirupsen/logrus"
	"net/http"
)

type MeterReadingController struct {
	App *core.Application
}

func (c MeterReadingController) Index(context *gin.Context) {
	var meterReadings []models.MeterReading
	err := c.App.Db.Model(&meterReadings).Select()

	if err != nil {
		context.Error(err)
	}

	if meterReadings == nil {
		meterReadings = make([]models.MeterReading, 0)
	}

	context.JSON(200, gin.H{"data": meterReadings})
}

func (c MeterReadingController) Get(context *gin.Context) {
	id, err := uuid.FromString(context.Param("id"))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UUID", "details": err})
		return
	}

	meterReading := &models.MeterReading{Id: id}
	err = c.App.Db.Select(meterReading)

	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": "Not found", "details": err})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": meterReading})
}

func (c MeterReadingController) Create(context *gin.Context) {
	var request *models.MeterReading

	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid format", "details": err})
		return
	}

	err := c.App.Db.Insert(request)
	if err != nil {
		log.WithError(err).Error("Unable to save MeterReading")
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error", "details": err})
		return
	}

	context.JSON(http.StatusCreated, nil)
}

func (c MeterReadingController) Update(context *gin.Context) {
	id, err := uuid.FromString(context.Param("id"))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UUID", "details": err})
		return
	}

	meterReading := &models.MeterReading{Id: id}
	err = c.App.Db.Select(meterReading)

	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": "Not found", "details": err})
		return
	}

	if err := context.ShouldBindJSON(&meterReading); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid format", "details": err})
		return
	}

	meterReading.Id = id

	err = c.App.Db.Update(meterReading)
	if err != nil {
		log.WithError(err).Error("Unable to save MeterReading")
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error", "details": err})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": meterReading})
}
