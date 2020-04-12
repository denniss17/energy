package controller

import (
	"energy/core"
	"energy/model"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
	log "github.com/sirupsen/logrus"
	"net/http"
)

type MeterReadingController struct {
	App *core.Application
}

func (c MeterReadingController) Index(context *gin.Context) {
	var meterReadings []model.MeterReading
	err := c.App.Db.Model(&meterReadings).Select()

	if err != nil {
		context.Error(err)
	}

	if meterReadings == nil {
		meterReadings = make([]model.MeterReading, 0)
	}

	context.JSON(200, gin.H{"data": meterReadings})
}

func (c MeterReadingController) Get(context *gin.Context) {
	id, err := uuid.FromString(context.Param("id"))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UUID", "details": err})
		return
	}

	meterReading := &model.MeterReading{Id: id}
	err = c.App.Db.Select(meterReading)

	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": "Not found", "details": err})
		return
	}

	context.JSON(http.StatusOK, meterReading)
}

func (c MeterReadingController) Create(context *gin.Context) {
	var meterReading *model.MeterReading

	if err := context.ShouldBindJSON(&meterReading); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid format", "details": err})
		return
	}

	err := c.App.Db.Insert(meterReading)
	if err != nil {
		log.WithError(err).Error("Unable to save MeterReading")
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error", "details": err})
		return
	}

	context.JSON(http.StatusCreated, nil)
}
