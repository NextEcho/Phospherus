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
