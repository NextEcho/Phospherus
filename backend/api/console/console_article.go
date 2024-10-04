package console

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model/common"
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
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := console.ArticleServiceInstance.GetArticleDetail(&input.GetArticleDetail{Id: req.Id})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.GetArticleDetail Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetArticleDetail{}
	copier.Copy(&resp, out)

	common.OkWithDetail(ctx, biz.MsgGetArticleDetailSuccess, resp)
}

// GetArticleList 分页获取文章列表数据
func (*ArticleApi) GetArticleList(ctx *gin.Context) {
	req := request.GetArticleList{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := console.ArticleServiceInstance.GetArticleList(&input.GetArticleList{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
		Title:    req.Title,
		TagIds:   req.TagIds,
	})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.GetArticleList Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetArticleList{
		PageResponse: out.PageResponse,
		ArticleList:  out.ArticleList,
	}

	common.OkWithDetail(ctx, biz.MsgGetArticleListSuccess, resp)
}

// DeleteArticle 删除文章，可批量删除和删除单个
func (*ArticleApi) DeleteArticle(ctx *gin.Context) {
	req := request.DeleteArticle{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = console.ArticleServiceInstance.DeleteArticle(&input.DeleteArticle{
		Ids: req.Ids,
	})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.DeleteArticle Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	common.OkWithMessage(ctx, biz.MsgDeleteArticleSuccess)
}

// PostArticle 发布文章
func (*ArticleApi) PostArticle(ctx *gin.Context) {
	req := request.PostArticle{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	if req.Title == "" || req.Content == "" {
		global.LOGGER.Error("Title or Content or Cover cannot be empty", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	out, err := console.ArticleServiceInstance.PostArticle(&input.PostArticle{
		AuthorId:  req.AuthorId,
		IsVisible: req.IsVisible,
		TagIds:    req.TagIds,
		Title:     req.Title,
		Cover:     req.Cover,
		Content:   req.Content,
		Status:    req.Status,
	})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.PostArticle Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	resp := response.PostArticle{
		Id: out.Id,
	}

	common.OkWithDetail(ctx, biz.MsgPostArticleSuccess, resp)
}

// UpdateArticle 更新文章
func (*ArticleApi) UpdateArticle(ctx *gin.Context) {
	req := request.UpdateArticle{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = console.ArticleServiceInstance.UpdateArticle(&input.UpdateArticle{
		Id:        req.Id,
		IsVisible: req.IsVisible,
		TagIds:    req.TagIds,
		Title:     req.Title,
		Status:    req.Status,
		Cover:     req.Cover,
		Content:   req.Content,
	})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.UpdateArticle Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	resp := response.UpdateArticle{
		Id: req.Id,
	}

	common.OkWithDetail(ctx, biz.MsgUpdateArticleSuccess, resp)
}

func (*ArticleApi) GetArticleListByTag(ctx *gin.Context) {
	req := request.GetArticleListByTag{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := console.ArticleServiceInstance.GetArticleListByTag(&input.GetArticleListByTag{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
		TagId:    req.TagId,
	})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.GetArticleListByTag Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetArticleListByTag{
		PageResponse: out.PageResponse,
		ArticleList:  out.ArticleList,
	}

	common.OkWithDetail(ctx, biz.MsgGetArticleListSuccess, resp)
}
