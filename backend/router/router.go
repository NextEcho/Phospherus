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
	adminRouteGroup.POST("login", admin.UserApiInstance.Login)

	adminArticleRouteGroup := adminRouteGroup.Group("article")
	{
		adminArticleRouteGroup.POST("getArticleDetail", admin.ArticleApiInstance.GetArticleDetail)
		adminArticleRouteGroup.POST("getArticleList", admin.ArticleApiInstance.GetArticleList)
		adminArticleRouteGroup.POST("postArticle", admin.ArticleApiInstance.PostArticle)
		adminArticleRouteGroup.POST("deleteArticle", admin.ArticleApiInstance.DeleteArticle)
		adminArticleRouteGroup.POST("updateArticle", admin.ArticleApiInstance.UpdateArticle)
	}

	// blog module
	// blogRouteGroup := r.Group("/api/blog")
	// {
	// 	blogRouteGroup.POST("getUserInfo", blog.UserApiInstance.GetUserInfo)
	// }

	return r
}
