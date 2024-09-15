package console

import (
	"phospherus/global/biz"
	commonresp "phospherus/model/common/response"

	"github.com/gin-gonic/gin"
)

type AuthApi struct{}

func (*AuthApi) ValidateToken(ctx *gin.Context) {
	commonresp.OkWithMessage(ctx, biz.MsgValidateTokenSuccess)
}
