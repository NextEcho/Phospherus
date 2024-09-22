package common

import (
	"net/http"
	"phospherus/global/biz"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func Result(ctx *gin.Context, code int, message string, data interface{}) {
	ctx.JSON(http.StatusOK, Response{
		code,
		message,
		data,
	})
}

// Ok 不带数据的成功响应
func Ok(ctx *gin.Context) {
	Result(ctx, biz.CodeSuccess, "操作成功", map[string]interface{}{})
}

// OkWithData 带有数据的成功响应
func OkWithData(ctx *gin.Context, data interface{}) {
	Result(ctx, biz.CodeSuccess, "查询成功", data)
}

// OkWithMessage 带有消息的成功响应
func OkWithMessage(ctx *gin.Context, message string) {
	Result(ctx, biz.CodeSuccess, message, map[string]interface{}{})
}

// OkWithDetail 既有消息又有数据的成功响应
func OkWithDetail(ctx *gin.Context, message string, data interface{}) {
	Result(ctx, biz.CodeSuccess, message, data)
}

// Fail 不带数据的失败响应
func Fail(ctx *gin.Context) {
	Result(ctx, biz.CodeFail, "操作失败", map[string]interface{}{})
}

// FailWithMessage 带有消息的失败响应
func FailWithMessage(ctx *gin.Context, message string) {
	Result(ctx, biz.CodeFail, message, map[string]interface{}{})
}

// FailWithCodeAndMessage 带有消息和响应码的失败响应
func FailWithCodeAndMessage(ctx *gin.Context, code int, message string) {
	Result(ctx, code, message, map[string]interface{}{})
}
