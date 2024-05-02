package router

import (
	"net/http"
	admin "phospherus/api/console"
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
	adminRouteGroup := RouteGroup.Group("console")
	adminRouteGroup.POST("login", admin.UserApiInstance.Login)

	adminRouteGroup.Use(middleware.Auth()) // 使用 JWT 中间件进行请求校验

	adminArticleRouteGroup := adminRouteGroup.Group("article")
	{
		adminArticleRouteGroup.POST("getArticleDetail", admin.ArticleApiInstance.GetArticleDetail)
		adminArticleRouteGroup.POST("getArticleList", admin.ArticleApiInstance.GetArticleList)
		adminArticleRouteGroup.POST("postArticle", admin.ArticleApiInstance.PostArticle)
		adminArticleRouteGroup.POST("deleteArticle", admin.ArticleApiInstance.DeleteArticle)
		adminArticleRouteGroup.POST("updateArticle", admin.ArticleApiInstance.UpdateArticle)
	}
	adminTagRouteGroup := adminRouteGroup.Group("tag")
	{
		adminTagRouteGroup.POST("getTagList", admin.TagApiInstance.GetTagList)
		adminTagRouteGroup.POST("createTag", admin.TagApiInstance.CreateTag)
		adminTagRouteGroup.POST("deleteTag", admin.TagApiInstance.DeleteTag)
		adminTagRouteGroup.POST("updateTag", admin.TagApiInstance.UpdateTag)
	}
	adminCategoryRouteGroup := adminRouteGroup.Group("category")
	{
		adminCategoryRouteGroup.POST("getCategoryList", admin.CategoryApiInstance.GetCategoryList)
		adminCategoryRouteGroup.POST("createCategory", admin.CategoryApiInstance.CreateCategory)
		adminCategoryRouteGroup.POST("deleteCategory", admin.CategoryApiInstance.DeleteCategory)
		adminCategoryRouteGroup.POST("updateCategory", admin.CategoryApiInstance.UpdateCategory)
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
