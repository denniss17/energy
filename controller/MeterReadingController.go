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
