package console

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model/common"
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
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := console.UserServiceInstance.Login(&input.Login{
		Passport: req.Passport,
		Password: req.Password,
	})
	if err != nil {
		global.LOGGER.Error("console.UserServiceInstance.Login Error", zap.Error(err))
		common.FailWithMessage(ctx, err.Error())
		return
	}

	var loginResp response.Login
	loginResp.Id = out.Id
	loginResp.Token = out.Token

	// 用户信息存入上下文
	ctx.Set("passport", req.Passport)

	common.OkWithDetail(ctx, biz.MsgLoginSuccess, loginResp)
}

func (*UserApi) GetUserList(ctx *gin.Context) {
	req := request.GetUserList{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := console.UserServiceInstance.GetUserList(&input.GetUserList{
		PageNum:  req.PageNum,
		PageSize: req.PageSize,
	})
	if err != nil {
		global.LOGGER.Error("console.UserServiceInstance.GetUserList Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	resp := response.GetUserList{
		PageResponse: out.PageResponse,
		UserList:     out.UserList,
	}

	common.OkWithDetail(ctx, biz.MsgGetUserListSuccess, resp)
}

func (*UserApi) GetUserInfo(ctx *gin.Context) {
	req := request.GetUserInfo{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := console.UserServiceInstance.GetUserInfo(&input.GetUserInfo{
		Id: req.Id,
	})
	if err != nil {
		global.LOGGER.Error("console.UserServiceInstance.GetUserInfo Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	if out == nil {
		common.FailWithMessage(ctx, biz.ErrUserNotFound.Error())
		return
	}

	resp := response.GetUserInfo{
		Id:           out.Id,
		Passport:     out.Passport,
		Nickname:     out.Nickname,
		Avatar:       out.Avatar,
		Signature:    out.Signature,
		Email:        out.Email,
		Github:       out.Github,
		Introduction: out.Introduction,
		Resume:       out.Resume,
	}

	common.OkWithDetail(ctx, biz.MsgGetUserInfoSuccess, resp)
}
