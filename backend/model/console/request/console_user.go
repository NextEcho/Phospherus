package request

import "phospherus/model/common"

type Login struct {
	Passport string `json:"passport"`
	Password string `json:"password"`
}

type GetUserList struct {
	common.PageRequest
}

type GetUserInfo struct {
	Id int `json:"id"`
}
