package console

import (
	"phospherus/global/biz"
	"phospherus/model/common"

	"github.com/gin-gonic/gin"
)

type AuthApi struct{}

func (*AuthApi) ValidateToken(ctx *gin.Context) {
	common.OkWithMessage(ctx, biz.MsgValidateTokenSuccess)
}
