package blog

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model/blog/input"
	"phospherus/model/blog/request"
	"phospherus/model/blog/response"
	commonresp "phospherus/model/common/response"
	"phospherus/service/blog"

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
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := blog.ArticleServiceInstance.GetArticleDetail(&input.GetArticleDetail{Id: req.Id})
	if err != nil {
		global.LOGGER.Error("blog.ArticleServiceInstance.GetArticleDetail Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrArticleNotFound.Error())
		return
	}
	resp := response.GetArticleDetail{}
	copier.Copy(&resp, out)

	commonresp.OkWithDetail(ctx, biz.MsgGetArticleDetailSuccess, resp)
}

func (*ArticleApi) GetArticleList(ctx *gin.Context) {
	req := request.GetArticleList{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := blog.ArticleServiceInstance.GetArticleList(&input.GetArticleList{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
	})
	if err != nil {
		global.LOGGER.Error("blog.ArticleServiceInstance.GetArticleList Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetArticleList{}
	copier.Copy(&resp, out)

	commonresp.OkWithDetail(ctx, biz.MsgGetArticleListSuccess, resp)
}

func (*ArticleApi) GetArticleListByTag(ctx *gin.Context) {
	req := request.GetArticleListByTag{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := blog.ArticleServiceInstance.GetArticleListByTag(&input.GetArticleListByTag{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
		TagId:    req.TagId,
	})
	if err != nil {
		global.LOGGER.Error("console.ArticleServiceInstance.GetArticleListByTag Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetArticleListByTag{
		PageResponse: out.PageResponse,
		ArticleList:  out.ArticleList,
	}

	commonresp.OkWithDetail(ctx, biz.MsgGetArticleListSuccess, resp)
}

func (*ArticleApi) GetArchiveList(ctx *gin.Context) {
	out, err := blog.ArticleServiceInstance.GetArchiveList()
	if err != nil {
		global.LOGGER.Error("blog.ArticleServiceInstance.GetArchiveList Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetArchiveList{}
	copier.Copy(&resp, out)

	commonresp.OkWithDetail(ctx, biz.MsgGetArticleListSuccess, resp)
}
