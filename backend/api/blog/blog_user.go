package blog

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model/blog/input"
	"phospherus/model/blog/request"
	"phospherus/model/blog/response"
	"phospherus/service/blog"

	commonresp "phospherus/model/common/response"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type UserApi struct{}

// GetUserInfo 获取博主信息
func (*UserApi) GetUserInfo(ctx *gin.Context) {
	req := request.GetUserInfo{}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := blog.UserServiceInstance.GetUserInfo(&input.GetUserInfo{Id: req.Id})
	if err != nil {
		global.LOGGER.Error("blog.UserServiceInstance.GetUserInfo Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	resp := response.GetUserInfo{
		UserInfo: out.UserItem,
	}
	commonresp.OkWithDetail(ctx, biz.MsgGetUserInfoSuccess, resp)
}
