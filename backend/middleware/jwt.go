package middleware

import (
	"phospherus/global"
	"phospherus/global/biz"
	commonresp "phospherus/model/common/response"
	"phospherus/pkg"
	"strings"

	"github.com/gin-gonic/gin"
)

// Jwt Jwt 中间件
func Jwt() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenStr := ctx.GetHeader("Authorization")

		if tokenStr == "" || !strings.HasPrefix(tokenStr, "Bearer ") {
			global.LOGGER.Error(biz.MsgInvalidToken)
			commonresp.FailWithMessage(ctx, biz.MsgInvalidToken)
			ctx.Abort()
			return
		}

		// 提取 token 有效部分
		tokenStr = tokenStr[7:]
		claims, err := pkg.VerifyToken(tokenStr)
		if err != nil {
			global.LOGGER.Error(biz.MsgInvalidToken)
			commonresp.FailWithMessage(ctx, biz.MsgInvalidToken)
			ctx.Abort()
			return
		}

		// 验证通过比较 passport
		issuer, err := claims.GetIssuer()
		if err != nil {
			global.LOGGER.Error(biz.MsgInvalidToken)
			commonresp.FailWithMessage(ctx, biz.MsgInvalidToken)
			ctx.Abort()
			return
		}

		// passport 对比失败
		if issuer != ctx.GetString("passport") {
			global.LOGGER.Error(biz.MsgInvalidToken)
			commonresp.FailWithMessage(ctx, biz.MsgInvalidToken)
			ctx.Abort()
			return
		}

		// 用户信息存入上下文
		ctx.Set("passport", issuer)
		ctx.Next()
	}
}
