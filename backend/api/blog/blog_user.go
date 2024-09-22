package blog

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model/blog/input"
	"phospherus/model/blog/request"
	"phospherus/model/blog/response"
	"phospherus/model/common"
	"phospherus/service/blog"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type UserApi struct{}

// GetUserInfo 获取博主信息
func (*UserApi) GetUserInfo(ctx *gin.Context) {
	req := request.GetUserInfo{}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := blog.UserServiceInstance.GetUserInfo(&input.GetUserInfo{Id: req.Id})
	if err != nil {
		global.LOGGER.Error("blog.UserServiceInstance.GetUserInfo Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
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
