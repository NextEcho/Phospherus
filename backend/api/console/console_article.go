package console

import (
	"phospherus/global"
	"phospherus/global/biz"
	commonresp "phospherus/model/common/response"
	"phospherus/model/console/input"
	"phospherus/model/console/request"
	"phospherus/model/console/response"
	"phospherus/service/console"

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

	out, err := console.ArticleServiceInstance.GetArticleDetail(&input.GetArticleDetail{Id: req.Id})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.GetArticleDetail Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetArticleDetail{}
	copier.Copy(&resp, out)

	commonresp.OkWithDetail(ctx, biz.MsgGetArticleDetailSuccess, resp)
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

	out, err := console.ArticleServiceInstance.GetArticleList(&input.GetArticleList{
		PageNum:    req.PageNum,
		PageSize:   req.PageSize,
		Title:      req.Title,
		CategoryId: req.CategoryId,
		TagIds:     req.TagIds,
	})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.GetArticleList Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetArticleList{
		PageResponse: out.PageResponse,
		ArticleList:  out.ArticleList,
	}

	commonresp.OkWithDetail(ctx, biz.MsgGetArticleListSuccess, resp)
}

// DeleteArticle 删除文章，可批量删除和删除单个
// 请求的文章 ID 以 string 传递，以逗号分隔
func (*ArticleApi) DeleteArticle(ctx *gin.Context) {
	req := request.DeleteArticle{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = console.ArticleServiceInstance.DeleteArticle(&input.DeleteArticle{
		Ids: req.Ids,
	})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.DeleteArticle Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	commonresp.OkWithMessage(ctx, biz.MsgDeleteArticleSuccess)
}

// PostArticle 发布文章
func (*ArticleApi) PostArticle(ctx *gin.Context) {
	req := request.PostArticle{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = console.ArticleServiceInstance.PostArticle(&input.PostArticle{
		AuthorId:   req.AuthorId,
		CategoryId: req.CategoryId,
		IsVisible:  req.IsVisible,
		IsAbout:    req.IsAbout,
		TagIds:     req.TagIds,
		Title:      req.Title,
		Cover:      req.Cover,
		Content:    req.Content,
	})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.PostArticle Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	commonresp.OkWithMessage(ctx, biz.MsgPostArticleSuccess)
}

// UpdateArticle 更新文章
func (*ArticleApi) UpdateArticle(ctx *gin.Context) {

	req := request.UpdateArticle{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = console.ArticleServiceInstance.UpdateArticle(&input.UpdateArticle{
		Id:         req.Id,
		AuthorId:   req.AuthorId,
		CategoryId: req.CategoryId,
		IsVisible:  req.IsVisible,
		IsAbout:    req.IsAbout,
		TagIds:     req.TagIds,
		Title:      req.Title,
		Cover:      req.Cover,
		Content:    req.Content,
	})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.UpdateArticle Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	commonresp.OkWithMessage(ctx, biz.MsgUpdateArticleSuccess)
}
