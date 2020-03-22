package controller

import (
	"energy/core"
	"energy/model"
	"github.com/gin-gonic/gin"
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

	context.JSON(200, meterReadings)

	//context.JSON(200, []model.MeterReading{
	//	model.MeterReading{
	//		Id:         1,
	//		Timestamp:  time.Now(),
	//		EnergyHigh: 1234,
	//		EnergyLow:  123,
	//		Gas:        234,
	//		Water:      345,
	//	},
	//})
}

func (c MeterReadingController) Create(context *gin.Context) {
	var meterReading *model.MeterReading

	if err := context.ShouldBindJSON(&meterReading); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := c.App.Db.Insert(meterReading)
	if err != nil {
		log.WithError(err).Error("Unable to save MeterReading")
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, nil)
}
