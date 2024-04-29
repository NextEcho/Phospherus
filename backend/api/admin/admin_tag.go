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

type TagApi struct{}

func (*TagApi) GetTagList(ctx *gin.Context) {
	req := request.GetTagList{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := admin.TagServiceInstance.GetTagList(&input.GetTagList{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
	})
	if err != nil {
		global.LOGGER.Error("admin.TagServiceInstance.GetTagList Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetTagList{
		PageResult: out.PageResult,
		TagList:    out.TagList,
	}

	commonresp.OkWithDetail(ctx, biz.MsgGetTagListSuccess, resp)
}

func (*TagApi) CreateTag(ctx *gin.Context) {
	req := request.CreateTag{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = admin.TagServiceInstance.CreateTag(&input.CreateTag{
		Name:      req.Name,
		IsVisible: req.IsVisible,
	})
	if err != nil {
		global.LOGGER.Error("admin.TagServiceInstance.CreateTag Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithMessage(ctx, biz.MsgCreateTagSuccess)
}

func (*TagApi) DeleteTag(ctx *gin.Context) {
	req := request.DeleteTag{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = admin.TagServiceInstance.DeleteTag(&input.DeleteTag{
		Ids: req.Ids,
	})
	if err != nil {
		global.LOGGER.Error("admin.TagServiceInstance.DeleteTag Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithMessage(ctx, biz.MsgDeleteTagSuccess)
}

func (*TagApi) UpdateTag(ctx *gin.Context) {
	req := request.UpdateTag{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = admin.TagServiceInstance.UpdateTag(&input.UpdateTag{
		Id:        req.Id,
		Name:      req.Name,
		IsVisible: req.IsVisible,
	})
	if err != nil {
		global.LOGGER.Error("admin.TagServiceInstance.UpdateTag Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithMessage(ctx, biz.MsgUpdateTagSuccess)
}
