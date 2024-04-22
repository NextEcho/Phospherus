package admin

import (
	"phospherus/model"
	"phospherus/model/admin/request"
	"phospherus/model/admin/response"
	commonresp "phospherus/model/common/response"
	"phospherus/pkg"
	"phospherus/service/admin"

	"github.com/gin-gonic/gin"
)

type UserApi struct{}

// Login 管理员登录
func (*UserApi) Login(ctx *gin.Context) {
	var loginReq request.Login
	ctx.ShouldBindJSON(&loginReq)

	out, err := admin.UserServiceInstance.Login(&model.User{
		Passport: loginReq.Passport,
		Password: loginReq.Password,
	})
	if err != nil {
		commonresp.FailWithMessage(ctx, pkg.MsgAccountMismatchPassword)
	}

	var loginResp response.Login
	loginResp.Id = out.Id
	loginResp.Token = out.Token

	commonresp.OkWithDetail(ctx, pkg.MsgLoginSuccess, loginResp)
}

// GetUserInfo 获取博主信息
func (*UserApi) GetUserInfo(ctx *gin.Context) {
	var getUserInfoReq request.GetUserInfo
	ctx.ShouldBindJSON(&getUserInfoReq)

	commonresp.OkWithMessage(ctx, pkg.MsgGetUserInfoSuccess)
}
