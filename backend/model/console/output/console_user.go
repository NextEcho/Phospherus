package output

import "phospherus/model/common"

type UserItem struct {
	Id       int    `json:"id"`
	Passport string `json:"passport"`
	Nickname string `json:"nickname"`
	Avatar   string `json:"avatar"`
	Email    string `json:"email"`
	Github   string `json:"github"`
}

type Login struct {
	Id    int    `json:"id"`
	Token string `json:"token"`
}

type CreateUser struct {
	Passport     string `json:"passport"`
	Nickname     string `json:"nickname"`
	Avatar       string `json:"avatar"`
	Signature    string `json:"signature"`
	Email        string `json:"email"`
	Github       string `json:"github"`
	Introduction string `json:"introduction"`
	Resume       string `json:"resume"`
}

type GetUserList struct {
	common.PageResponse
	UserList []UserItem `json:"userList"`
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

type DeleteUser struct {
}

type UpdateUser struct {
}

type UpdateAvatar struct {
}
