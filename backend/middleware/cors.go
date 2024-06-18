package middleware

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Cors 跨域中间件
func Cors() gin.HandlerFunc {
	return cors.New(cors.Config{
		// 允许任何源
		AllowOrigins: []string{"*"},
		// 允许任何 HTTP 方法
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		// 允许任何 HTTP 头部
		AllowHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
		// 暴露的 HTTP 头部
		ExposeHeaders: []string{"Content-Length"},
		// 是否允许携带身份凭证
		AllowCredentials: true,
		// 用于缓存预检请求结果的最大时间
		MaxAge: 12 * time.Hour,
	})
}
