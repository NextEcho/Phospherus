package blog

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model/blog/response"
	commonresp "phospherus/model/common/response"
	"phospherus/service/blog"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type TagApi struct{}

func (*TagApi) GetTagList(ctx *gin.Context) {

	out, err := blog.TagServiceInstance.GetTagList()
	if err != nil {
		global.LOGGER.Error("blog.TagServiceInstance.GetTagList Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}
	resp := response.GetTagList{
		TagList: out.TagList,
	}

	commonresp.OkWithDetail(ctx, biz.MsgGetTagListSuccess, resp)
}
