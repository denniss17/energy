package controllers

import (
	"energy/container"
	"energy/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type MeterController struct {
	Context *container.ApplicationContext
}

func (controller MeterController) Index(c *gin.Context) {
	var meters []models.Meter

	result := controller.Context.Db.Find(&meters)

	if err := result.Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error", "details": err})
		return
	}

	if meters == nil {
		meters = make([]models.Meter, 0)
	}

	c.JSON(http.StatusOK, gin.H{"data": meters})
}

func (controller MeterController) Create(c *gin.Context) {
	var meter *models.Meter

	if err := c.ShouldBindJSON(&meter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid format", "details": err})
		return
	}

	result := controller.Context.Db.Create(meter)
	if err := result.Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error", "details": err})
		return
	}

	c.JSON(http.StatusCreated, nil)
}
