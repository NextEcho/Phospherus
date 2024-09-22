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

type GetUserList struct {
	common.PageResponse
	UserList []UserItem `json:"userList"`
}
