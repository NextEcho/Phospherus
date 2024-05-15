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
	"go.uber.org/zap"
)

type CategoryApi struct{}

func (*CategoryApi) GetCategoryList(ctx *gin.Context) {
	req := request.GetCategoryList{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := blog.CategoryServiceInstance.GetCategoryList(&input.GetCategoryList{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
	})
	if err != nil {
		global.LOGGER.Error("blog.CategoryServiceInstance.GetCategoryList Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetCategoryList{
		PageResponse: out.PageResponse,
		CategoryList: out.CategoryList,
	}

	commonresp.OkWithDetail(ctx, biz.MsgGetCategoryListSuccess, resp)
}
