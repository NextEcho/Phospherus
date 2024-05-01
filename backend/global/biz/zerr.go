package biz

import "errors"

var ErrPasswordMismatch = errors.New("密码不匹配")
var ErrBindJSON = errors.New("JSON数据绑定失败")
var ErrServerBusy = errors.New("服务器繁忙")
var ErrJwtInvalid = errors.New("JWT无效")
var ErrCreateJwt = errors.New("创建JWT失败")
