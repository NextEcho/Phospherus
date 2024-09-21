package router

import (
	"net/http"
	"phospherus/api/blog"
	"phospherus/api/console"
	"phospherus/global"
	"phospherus/middleware"

	"github.com/gin-gonic/gin"
)

func Router() *gin.Engine {
	gin.SetMode(global.APP_CONFIG.Mode)
	r := gin.Default()

	r.Use(middleware.Cors(), middleware.ZapLogger(), middleware.ZapLogger())

	r.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "路由不存在",
		})
	})

	RouteGroup := r.Group("api")

	//////////////////
	// Console ///////
	//////////////////
	consoleRouteGroup := RouteGroup.Group("console")
	consoleRouteGroup.POST("login", console.UserApiInstance.Login)

	consoleRouteGroup.Use(middleware.Auth()) // JWT 请求校验
	consoleAuthRouteGroup := consoleRouteGroup.Group("auth")
	{
		consoleAuthRouteGroup.POST("validateToken", console.AuthApiInstance.ValidateToken)
	}
	consoleArticleRouteGroup := consoleRouteGroup.Group("article")
	{
		consoleArticleRouteGroup.POST("getArticleDetail", console.ArticleApiInstance.GetArticleDetail)
		consoleArticleRouteGroup.POST("getArticleList", console.ArticleApiInstance.GetArticleList)
		consoleArticleRouteGroup.POST("postArticle", console.ArticleApiInstance.PostArticle)
		consoleArticleRouteGroup.POST("deleteArticle", console.ArticleApiInstance.DeleteArticle)
		consoleArticleRouteGroup.POST("updateArticle", console.ArticleApiInstance.UpdateArticle)
	}
	consoleTagRouteGroup := consoleRouteGroup.Group("tag")
	{
		consoleTagRouteGroup.POST("getTagList", console.TagApiInstance.GetTagList)
		consoleTagRouteGroup.POST("createTag", console.TagApiInstance.CreateTag)
		consoleTagRouteGroup.POST("deleteTag", console.TagApiInstance.DeleteTag)
		consoleTagRouteGroup.POST("updateTag", console.TagApiInstance.UpdateTag)
	}
	consoleCategoryRouteGroup := consoleRouteGroup.Group("category")
	{
		consoleCategoryRouteGroup.POST("getCategoryList", console.CategoryApiInstance.GetCategoryList)
		consoleCategoryRouteGroup.POST("createCategory", console.CategoryApiInstance.CreateCategory)
		consoleCategoryRouteGroup.POST("deleteCategory", console.CategoryApiInstance.DeleteCategory)
		consoleCategoryRouteGroup.POST("updateCategory", console.CategoryApiInstance.UpdateCategory)
	}
	consoleAttachmentRouteGroup := consoleRouteGroup.Group("attachment")
	{
		consoleAttachmentRouteGroup.POST("uploadAttachment", console.AttachmentApiInstance.UploadAttachment)
		consoleAttachmentRouteGroup.POST("deleteAttachment", console.AttachmentApiInstance.DeleteAttachment)
		consoleAttachmentRouteGroup.POST("getAttachment", console.AttachmentApiInstance.GetAttachment)
	}

	//////////////
	// Blog //////
	//////////////
	blogRouteGroup := RouteGroup.Group("blog")

	blogUserRouteGroup := blogRouteGroup.Group("user")
	{
		blogUserRouteGroup.POST("getUserInfo", blog.UserApiInstance.GetUserInfo)
	}
	blogArticleRouteGroup := blogRouteGroup.Group("article")
	{
		blogArticleRouteGroup.POST("getArticleDetail", blog.ArticleApiInstance.GetArticleDetail)
		blogArticleRouteGroup.POST("getArticleList", blog.ArticleApiInstance.GetArticleList)
		blogArticleRouteGroup.POST("getArticleListByTag", blog.ArticleApiInstance.GetArticleListByTag)
		blogArticleRouteGroup.GET("getArchiveList", blog.ArticleApiInstance.GetArchiveList)
	}
	blogTagRouteGroup := blogRouteGroup.Group("tag")
	{
		blogTagRouteGroup.GET("getTagList", blog.TagApiInstance.GetTagList)
	}
	blogCategoryRouteGroup := blogRouteGroup.Group("category")
	{
		blogCategoryRouteGroup.POST("getCategoryList", blog.CategoryApiInstance.GetCategoryList)
	}

	return r
}
