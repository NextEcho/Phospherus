package biz

import "errors"

var (
	ErrPasswordMismatch = errors.New("密码不匹配")
	ErrBindJSON         = errors.New("JSON数据绑定失败")
	ErrServerBusy       = errors.New("服务器繁忙")
	ErrJwtInvalid       = errors.New("JWT无效")
	ErrCreateJwt        = errors.New("创建JWT失败")
	ErrRecordNotFound   = errors.New("数据不存在")
	ErrFormFile         = errors.New("解析表单文件失败")
	ErrIOReadAll        = errors.New("读取文件失败")
	ErrUploadFile       = errors.New("上传文件失败")
)

// Article Error
var (
	ErrArticleNotFound = errors.New("文章不存在")
)

// Tag Error

var (
	ErrTagExist = errors.New("标签已存在")
)
