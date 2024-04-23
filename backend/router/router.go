package router

import (
	"net/http"
	"phospherus/api/admin"
	"phospherus/api/blog"
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
	}

	// blog module
	blogRouteGroup := r.Group("/api/blog")
	{
		blogRouteGroup.POST("/getUserInfo", blog.UserApiInstance.GetUserInfo)
	}

	return r
}
