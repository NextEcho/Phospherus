package admin

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model/admin/input"
	"phospherus/model/admin/request"
	"phospherus/model/admin/response"
	commonresp "phospherus/model/common/response"
	"phospherus/service/admin"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
	"go.uber.org/zap"
)

type ArticleApi struct{}

// GetArticleDetail 获取文章详情信息
func (*ArticleApi) GetArticleDetail(ctx *gin.Context) {
	req := request.GetArticleDetail{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := admin.ArticleServiceInstance.GetArticleDetail(&input.GetArticleDetail{Id: req.Id})
	if err != nil {
		global.LOGGER.Error("admin.ArticleServiceInstance.GetArticleDetail Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetArticleDetail{}
	copier.Copy(&resp, out)

	commonresp.OkWithData(ctx, resp)
}

// GetArticleList 分页获取文章列表数据
func (*ArticleApi) GetArticleList(ctx *gin.Context) {
	req := request.GetArticleList{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := admin.ArticleServiceInstance.GetArticleList(&input.GetArticleList{
		PageNum:    req.PageNum,
		PageSize:   req.PageSize,
		Title:      req.Title,
		CategoryId: req.CategoryId,
		TagIds:     req.TagIds,
	})
	if err != nil {
		global.LOGGER.Error("admin.ArticleServiceInstance.GetArticleList Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithData(ctx, out)
}

// PostArticle 发布文章
func (*ArticleApi) PostArticle(ctx *gin.Context) {

}

// DeleteArticle 删除文章，可批量删除和删除单个
func (*ArticleApi) DeleteArticle(ctx *gin.Context) {

}

// UpdateArticle 更新文章
func (*ArticleApi) UpdateArticle(ctx *gin.Context) {

}
