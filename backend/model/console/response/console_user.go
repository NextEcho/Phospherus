package response

import "phospherus/model/common"

type Login struct {
	Id    int    `json:"id"`
	Token string `json:"token"`
}

type GetUserList struct {
	common.PageResponse
	UserList any `json:"userList"`
}

type GetUserInfo struct {
	Id           int    `json:"id"`
	Passport     string `json:"passport"`
	Nickname     string `json:"nickname"`
	Avatar       string `json:"avatar"`
	Signature    string `json:"signature"`
	Email        string `json:"email"`
	Github       string `json:"github"`
	Introduction string `json:"introduction"`
	Resume       string `json:"resume"`
}
