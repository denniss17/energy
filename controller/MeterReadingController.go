package controller

import (
	"energy/core"
	"energy/model"
	"github.com/gin-gonic/gin"
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
