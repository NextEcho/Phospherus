package admin

import (
	"phospherus/global/biz"
	"phospherus/model/admin/input"
	"phospherus/model/admin/request"
	"phospherus/model/admin/response"
	commonresp "phospherus/model/common/response"
	"phospherus/service/admin"

	"github.com/gin-gonic/gin"
)

type UserApi struct{}

// Login 管理员登录
func (*UserApi) Login(ctx *gin.Context) {
	var loginReq request.Login
	ctx.ShouldBindJSON(&loginReq)

	out, err := admin.UserServiceInstance.Login(&input.Login{
		Passport: loginReq.Passport,
		Password: loginReq.Password,
	})
	if err != nil {
		commonresp.FailWithMessage(ctx, biz.MsgAccountMismatchPassword)
	}

	var loginResp response.Login
	loginResp.Id = out.Id
	loginResp.Token = out.Token

	commonresp.OkWithDetail(ctx, biz.MsgLoginSuccess, loginResp)
}
