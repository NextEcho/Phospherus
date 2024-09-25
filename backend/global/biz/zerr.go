package biz

import "errors"

var (
	ErrPasswordMismatch = errors.New("密码不匹配")
	ErrBindJSON         = errors.New("JSON数据绑定失败")
	ErrServerBusy       = errors.New("服务器繁忙")
	ErrRecordNotFound   = errors.New("数据不存在")
	ErrFormFile         = errors.New("解析表单文件失败")
	ErrIOReadAll        = errors.New("读取文件失败")
)

// Auth Error
var (
	ErrJwtInvalid = errors.New("JWT无效")
	ErrCreateJwt  = errors.New("创建JWT失败")
)

// Attachment Error
var (
	ErrUploadAttachment = errors.New("上传附件失败")
	ErrSaveAttachment   = errors.New("保存附件失败")
)

// Article Error
var (
	ErrArticleNotFound = errors.New("文章不存在")
)

// Tag Error
var (
	ErrTagExist = errors.New("标签已存在")
)
