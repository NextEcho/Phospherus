package commonresp

import "errors"

var (
	ErrBindJSON   = errors.New("绑定参数错误")
	ErrServerBusy = errors.New("服务器繁忙")
)
