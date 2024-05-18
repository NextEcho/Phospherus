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

type TagApi struct{}

func (*TagApi) GetTagList(ctx *gin.Context) {
	req := request.GetTagList{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := blog.TagServiceInstance.GetTagList(&input.GetTagList{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
	})
	if err != nil {
		global.LOGGER.Error("blog.TagServiceInstance.GetTagList Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetTagList{
		PageResponse: out.PageResponse,
		TagList:      out.TagList,
	}

	commonresp.OkWithDetail(ctx, biz.MsgGetTagListSuccess, resp)
}
