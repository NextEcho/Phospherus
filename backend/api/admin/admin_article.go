package admin

import (
	"phospherus/global"
	"phospherus/model/admin/input"
	"phospherus/model/admin/request"
	commonresp "phospherus/model/common/response"
	"phospherus/service/admin"

	"github.com/gin-gonic/gin"
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
		global.LOGGER.Error("admin.ArticleServiceInstance.GetArticle Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, commonresp.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithData(ctx, out)
}
