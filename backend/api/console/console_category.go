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

	out, err := console.CategoryServiceInstance.GetCategoryList(&input.GetCategoryList{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
	})
	if err != nil {
		global.LOGGER.Error("console.CategoryServiceInstance.GetCategoryList Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetCategoryList{
		PageResponse: out.PageResponse,
		CategoryList: out.CategoryList,
	}

	commonresp.OkWithDetail(ctx, biz.MsgGetCategoryListSuccess, resp)
}

func (*CategoryApi) CreateCategory(ctx *gin.Context) {
	req := request.CreateCategory{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = console.CategoryServiceInstance.CreateCategory(&input.CreateCategory{
		ParentId:  req.ParentId,
		Name:      req.Name,
		IsVisible: req.IsVisible,
	})
	if err != nil {
		global.LOGGER.Error("console.CategoryServiceInstance.CreateCategory Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithMessage(ctx, biz.MsgCreateCategorySuccess)
}

func (*CategoryApi) DeleteCategory(ctx *gin.Context) {
	req := request.DeleteCategory{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = console.CategoryServiceInstance.DeleteCategory(&input.DeleteCategory{
		Ids: req.Ids,
	})
	if err != nil {
		global.LOGGER.Error("console.CategoryServiceInstance.DeleteCategory Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithMessage(ctx, biz.MsgDeleteCategorySuccess)
}

func (*CategoryApi) UpdateCategory(ctx *gin.Context) {
	req := request.UpdateCategory{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = console.CategoryServiceInstance.UpdateCategory(&input.UpdateCategory{
		Id:        req.Id,
		ParentId:  req.ParentId,
		Name:      req.Name,
		IsVisible: req.IsVisible,
	})
	if err != nil {
		global.LOGGER.Error("console.CategoryServiceInstance.UpdateCategory Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithMessage(ctx, biz.MsgUpdateCategorySuccess)
}
