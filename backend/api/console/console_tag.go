package console

import (
	"errors"
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

type TagApi struct{}

func (*TagApi) GetTagList(ctx *gin.Context) {
	req := request.GetTagList{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := console.TagServiceInstance.GetTagList(&input.GetTagList{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
	})
	if err != nil {
		global.LOGGER.Error("console.TagServiceInstance.GetTagList Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetTagList{
		PageResponse: out.PageResponse,
		TagList:      out.TagList,
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

	_, err = console.TagServiceInstance.CreateTag(&input.CreateTag{
		Name:            req.Name,
		BackgroundColor: req.BackgroundColor,
	})
	if err != nil {
		global.LOGGER.Error("console.TagServiceInstance.CreateTag Error", zap.Error(err))
		if errors.Is(err, biz.ErrTagExist) {
			commonresp.FailWithMessage(ctx, biz.ErrTagExist.Error())
			return
		}

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

	_, err = console.TagServiceInstance.DeleteTag(&input.DeleteTag{
		Ids: req.Ids,
	})
	if err != nil {
		global.LOGGER.Error("console.TagServiceInstance.DeleteTag Error", zap.Error(err))
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

	_, err = console.TagServiceInstance.UpdateTag(&input.UpdateTag{
		Id:   req.Id,
		Name: req.Name,
	})
	if err != nil {
		global.LOGGER.Error("console.TagServiceInstance.UpdateTag Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	commonresp.OkWithMessage(ctx, biz.MsgUpdateTagSuccess)
}
