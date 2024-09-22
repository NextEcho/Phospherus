package middleware

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model/common"
	"phospherus/pkg"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// Auth 认证中间件，使用了 Jwt
func Auth() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenStr := ctx.GetHeader("Authorization")

		if tokenStr == "" || !strings.HasPrefix(tokenStr, "Bearer ") {
			global.LOGGER.Error(biz.MsgTokenInvalid)
			common.FailWithCodeAndMessage(ctx, biz.CodeTokenInvalid, biz.MsgTokenInvalid)
			ctx.Abort()
			return
		}

		// 提取 token 有效部分
		tokenStr = tokenStr[7:]
		claims, err := pkg.VerifyToken(tokenStr)
		if err != nil {
			global.LOGGER.Error(biz.MsgTokenInvalid)
			common.FailWithCodeAndMessage(ctx, biz.CodeTokenInvalid, biz.MsgTokenInvalid)
			ctx.Abort()
			return
		}

		// 验证 token 是否过期
		if time.Now().Unix() > claims.ExpiresAt.Unix() {
			global.LOGGER.Error(biz.MsgTokenInvalid)
			common.FailWithCodeAndMessage(ctx, biz.CodeTokenInvalid, biz.MsgTokenInvalid)
			ctx.Abort()
			return
		}

		// 用户信息存入上下文
		ctx.Set("passport", claims.Issuer)
		ctx.Next()
	}
}
