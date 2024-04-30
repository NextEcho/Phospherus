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

	out, err := admin.CategoryServiceInstance.GetCategoryList(&input.GetCategoryList{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
	})
	if err != nil {
		global.LOGGER.Error("admin.CategoryServiceInstance.GetCategoryList Error", zap.Error(err))
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

	_, err = admin.CategoryServiceInstance.CreateCategory(&input.CreateCategory{
		ParentId:  req.ParentId,
		Name:      req.Name,
		IsVisible: req.IsVisible,
	})
	if err != nil {
		global.LOGGER.Error("admin.CategoryServiceInstance.CreateCategory Error", zap.Error(err))
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

	_, err = admin.CategoryServiceInstance.DeleteCategory(&input.DeleteCategory{
		Ids: req.Ids,
	})
	if err != nil {
		global.LOGGER.Error("admin.CategoryServiceInstance.DeleteCategory Error", zap.Error(err))
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

	_, err = admin.CategoryServiceInstance.UpdateCategory(&input.UpdateCategory{
		Id:        req.Id,
		ParentId:  req.ParentId,
		Name:      req.Name,
		IsVisible: req.IsVisible,
	})
	if err != nil {
		global.LOGGER.Error("admin.CategoryServiceInstance.UpdateCategory Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithMessage(ctx, biz.MsgUpdateCategorySuccess)
}
