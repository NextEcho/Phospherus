package blog

import (
	"phospherus/global/biz"
	"phospherus/model/blog/request"

	commonresp "phospherus/model/common/response"

	"github.com/gin-gonic/gin"
)

type UserApi struct{}

// GetUserInfo 获取博主信息
func (*UserApi) GetUserInfo(ctx *gin.Context) {
	var getUserInfoReq request.GetUserInfo
	ctx.ShouldBindJSON(&getUserInfoReq)

	commonresp.OkWithMessage(ctx, biz.MsgGetUserInfoSuccess)
}
