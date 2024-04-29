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

}
func (*TagApi) DeleteTag(ctx *gin.Context) {

}
func (*TagApi) UpdateTag(ctx *gin.Context) {

}
