package output

type UserItem struct {
	Id       int    `json:"id"`
	Passport string `json:"passport"`
	Nickname string `json:"nickname"`
	Avatar   string `json:"avatar"`
	Email    string `json:"email"`
	Github   string `json:"github"`
}

type GetUserInfo struct {
	UserItem `json:"user_item"`
}
