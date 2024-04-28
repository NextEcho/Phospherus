package biz

import "errors"

var ErrPasswordMismatch = errors.New("密码不匹配")
var ErrBindJSON = errors.New("JSON数据不匹配")
var ErrServerBusy = errors.New("服务器繁忙")
