package biz

import "errors"

var (
	ErrPasswordMismatch = errors.New("密码不匹配")
	ErrBindJSON         = errors.New("JSON数据绑定失败")
	ErrServerBusy       = errors.New("服务器繁忙")
	ErrJwtInvalid       = errors.New("JWT无效")
	ErrCreateJwt        = errors.New("创建JWT失败")
	ErrRecordNotFound   = errors.New("数据不存在")
)

// Article Error
var (
	ErrArticleNotFound = errors.New("文章不存在")
)
