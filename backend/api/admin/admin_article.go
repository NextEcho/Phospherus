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
	resp := response.GetArticleList{
		PageResult:  out.PageResult,
		ArticleList: out.ArticleList,
	}

	commonresp.OkWithDetail(ctx, biz.MsgGetArticleListSuccess, resp)
}

// PostArticle 发布文章
func (*ArticleApi) PostArticle(ctx *gin.Context) {

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

	_, err = admin.ArticleServiceInstance.DeleteArticle(&input.DeleteArticle{
		Ids: req.Ids,
	})
	if err != nil {
		global.LOGGER.Error("admin.ArticleServiceInstance.DeleteArticle Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	commonresp.OkWithMessage(ctx, biz.MsgDeleteArticleSuccess)
}

// UpdateArticle 更新文章
func (*ArticleApi) UpdateArticle(ctx *gin.Context) {

}
