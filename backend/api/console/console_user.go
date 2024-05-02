package console

import (
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

	out, err := console.UserServiceInstance.Login(&input.Login{
		Passport: req.Passport,
		Password: req.Password,
	})
	if err != nil {
		global.LOGGER.Error("console.UserServiceInstance.Login Error", zap.Error(err))
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
