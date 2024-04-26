package admin

import (
	"phospherus/global"
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

func (*ArticleApi) GetArticleDetail(ctx *gin.Context) {
	req := request.GetArticleDetail{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, commonresp.ErrBindJSON.Error())
		return
	}

	out, err := admin.ArticleServiceInstance.GetArticleDetail(&input.GetArticleDetail{Id: req.Id})
	if err != nil {
		global.LOGGER.Error("admin.ArticleServiceInstance.GetArticleDetail Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, commonresp.ErrServerBusy.Error())
		return
	}
	resp := response.GetArticleDetail{}
	copier.Copy(&resp, out)

	commonresp.OkWithData(ctx, resp)
}

func (*ArticleApi) GetArticleList(ctx *gin.Context) {
	req := request.GetArticleList{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, commonresp.ErrBindJSON.Error())
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
		commonresp.FailWithMessage(ctx, commonresp.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithData(ctx, out)
}
