package router

import (
	"net/http"
	"phospherus/api/admin"
	"phospherus/middleware"

	"github.com/gin-gonic/gin"
)

func Router() *gin.Engine {
	r := gin.Default()

	r.Use(middleware.Cors(), middleware.ZapLogger())

	r.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "路由不存在",
		})
	})

	// admin module
	adminRouteGroup := r.Group("/api/admin")
	{
		adminRouteGroup.POST("/login", admin.UserApiInstance.Login)
		adminRouteGroup.POST("/getUserInfo", admin.UserApiInstance.GetUserInfo)
	}

	// blog module

	return r
}
