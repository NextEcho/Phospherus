package router

import (
	"net/http"
	"phospherus/api/blog"
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

	////////////////////////////////
	// Console /////////////////////
	////////////////////////////////
	consoleRouteGroup := RouteGroup.Group("console")
	consoleRouteGroup.POST("login", admin.UserApiInstance.Login)

	consoleRouteGroup.Use(middleware.Auth()) // 使用 JWT 中间件进行请求校验

	consoleArticleRouteGroup := consoleRouteGroup.Group("article")
	{
		consoleArticleRouteGroup.POST("getArticleDetail", admin.ArticleApiInstance.GetArticleDetail)
		consoleArticleRouteGroup.POST("getArticleList", admin.ArticleApiInstance.GetArticleList)
		consoleArticleRouteGroup.POST("postArticle", admin.ArticleApiInstance.PostArticle)
		consoleArticleRouteGroup.POST("deleteArticle", admin.ArticleApiInstance.DeleteArticle)
		consoleArticleRouteGroup.POST("updateArticle", admin.ArticleApiInstance.UpdateArticle)
	}
	consoleTagRouteGroup := consoleRouteGroup.Group("tag")
	{
		consoleTagRouteGroup.POST("getTagList", admin.TagApiInstance.GetTagList)
		consoleTagRouteGroup.POST("createTag", admin.TagApiInstance.CreateTag)
		consoleTagRouteGroup.POST("deleteTag", admin.TagApiInstance.DeleteTag)
		consoleTagRouteGroup.POST("updateTag", admin.TagApiInstance.UpdateTag)
	}
	consoleCategoryRouteGroup := consoleRouteGroup.Group("category")
	{
		consoleCategoryRouteGroup.POST("getCategoryList", admin.CategoryApiInstance.GetCategoryList)
		consoleCategoryRouteGroup.POST("createCategory", admin.CategoryApiInstance.CreateCategory)
		consoleCategoryRouteGroup.POST("deleteCategory", admin.CategoryApiInstance.DeleteCategory)
		consoleCategoryRouteGroup.POST("updateCategory", admin.CategoryApiInstance.UpdateCategory)
	}

	////////////////////////////////
	// Blog ////////////////////////
	////////////////////////////////
	blogRouteGroup := RouteGroup.Group("blog")
	blogUserRouteGroup := blogRouteGroup.Group("user")
	{
		blogUserRouteGroup.POST("getUserInfo", blog.UserApiInstance.GetUserInfo)
	}
	blogArticleRouteGroup := blogRouteGroup.Group("article")
	{
		blogArticleRouteGroup.POST("getArticleDetail", blog.ArticleApiInstance.GetArticleDetail)
		blogArticleRouteGroup.POST("getArticleList", blog.ArticleApiInstance.GetArticleList)
	}
	blogTagRouteGroup := blogRouteGroup.Group("tag")
	{
		blogTagRouteGroup.POST("getTagList", blog.TagApiInstance.GetTagList)
	}
	blogCategoryRouteGroup := blogRouteGroup.Group("category")
	{
		blogCategoryRouteGroup.POST("getCategoryList", blog.CategoryApiInstance.GetCategoryList)
	}

	return r
}
