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

type UserApi struct{}

// Login 管理员登录
func (*UserApi) Login(ctx *gin.Context) {
	req := request.Login{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := admin.UserServiceInstance.Login(&input.Login{
		Passport: req.Passport,
		Password: req.Password,
	})
	if err != nil {
		global.LOGGER.Error("admin.UserServiceInstance.Login Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, err.Error())
		return
	}

	var loginResp response.Login
	loginResp.Id = out.Id
	loginResp.Token = out.Token

	// 用户信息存入上下文
	ctx.Set("passport", req.Passport)

	commonresp.OkWithDetail(ctx, biz.MsgLoginSuccess, loginResp)
}
