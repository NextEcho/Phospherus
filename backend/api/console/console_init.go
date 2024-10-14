package console

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model/common"
	"phospherus/model/console/input"
	"phospherus/model/console/request"
	"phospherus/service/console"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type InitApi struct{}

// InitSystem 初始化系统
func (*InitApi) InitSystem(ctx *gin.Context) {
	req := request.InitSystem{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	if req.Password != req.ConfirmPassword {
		global.LOGGER.Error("confirm password don't match")
		common.FailWithMessage(ctx, biz.MsgConfirmPasswordNotMatch)
		return
	}

	if req.WebsiteName == "" {
		global.LOGGER.Error("website name is empty")
		common.FailWithMessage(ctx, biz.MsgWebsiteNameEmpty)
		return
	}

	_, err = console.InitServiceInstance.InitSystem(&input.InitSystem{
		WebsiteName: req.WebsiteName,
		Passport:    req.Passport,
		Password:    req.Password,
		Email:       req.Email,
	})
	if err != nil {
		global.LOGGER.Error("console.InitServiceInstance.InitSystem Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	common.OkWithMessage(ctx, biz.MsgInitSystemSuccess)
}

// IsSystemInitialized 判断系统是否已初始化
func (*InitApi) IsSystemInitialized(ctx *gin.Context) {

	count := int64(0)
	err := global.DB.Table("user").Count(&count).Error
	if err != nil {
		global.LOGGER.Error("global.DB.Table.Count Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	if count > 0 {
		common.OkWithMessage(ctx, biz.MsgSystemInitialized)
		return
	}

	common.FailWithMessage(ctx, biz.MsgSystemNotInitialized)
}
