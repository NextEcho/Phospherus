package request

import "phospherus/model/common"

type Login struct {
	Passport string `json:"passport"`
	Password string `json:"password"`
}

type CreateUser struct {
	Passport     string `json:"passport"`
	Password     string `json:"password"`
	Nickname     string `json:"nickname"`
	Avatar       string `json:"avatar"`
	Signature    string `json:"signature"`
	Email        string `json:"email"`
	Github       string `json:"github"`
	Introduction string `json:"introduction"`
	Resume       string `json:"resume"`
}

type GetUserList struct {
	common.PageRequest
}

type GetUserInfo struct {
	Id int `json:"id"`
}

type DeleteUser struct {
	Id int `json:"id"`
}
