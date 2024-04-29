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

	RouteGroup := r.Group("api")

	// admin module
	adminRouteGroup := RouteGroup.Group("admin")
	adminRouteGroup.POST("login", admin.UserApiInstance.Login)
	adminArticleRouteGroup := adminRouteGroup.Group("article")
	{
		adminArticleRouteGroup.POST("getArticleDetail", admin.ArticleApiInstance.GetArticleDetail)
		adminArticleRouteGroup.POST("getArticleList", admin.ArticleApiInstance.GetArticleList)
		adminArticleRouteGroup.POST("postArticle", admin.ArticleApiInstance.PostArticle)
		adminArticleRouteGroup.POST("deleteArticle", admin.ArticleApiInstance.DeleteArticle)
		adminArticleRouteGroup.POST("updateArticle", admin.ArticleApiInstance.UpdateArticle)
	}
	adminTagRouterGroup := adminRouteGroup.Group("tag")
	{
		adminTagRouterGroup.POST("getTagList", admin.TagApiInstance.GetTagList)
		adminTagRouterGroup.POST("createTag", admin.TagApiInstance.CreateTag)
		adminTagRouterGroup.POST("deleteTag", admin.TagApiInstance.DeleteTag)
		adminTagRouterGroup.POST("updateTag", admin.TagApiInstance.UpdateTag)
	}

	// blog module
	blogRouteGroup := RouteGroup.Group("blog")
	blogArticleRouteGroup := blogRouteGroup.Group("article")
	{
		blogArticleRouteGroup.GET("/ping", func(ctx *gin.Context) {
			ctx.Writer.WriteString("pong")
		})
	}

	return r
}
