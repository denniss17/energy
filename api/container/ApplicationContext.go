package container

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ApplicationContext struct {
	Router *gin.Engine
	Db     *gorm.DB
}
