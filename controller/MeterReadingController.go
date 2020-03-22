package controller

import (
	"energy/model"
	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg"
)

type MeterReadingController struct {
	Db *pg.DB
}

func (c MeterReadingController) Index(context *gin.Context) {
	var meterReadings []model.MeterReading
	err := c.Db.Model(&meterReadings).Select()

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
