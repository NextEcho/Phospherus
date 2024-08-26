package output

type UserItem struct {
	Id           int    `json:"id"`
	Passport     string `json:"passport"`
	Nickname     string `json:"nickname"`
	Avatar       string `json:"avatar"`
	Email        string `json:"email"`
	Github       string `json:"github"`
	Introduction string `json:"introduction"`
}

type GetUserInfo struct {
	UserItem `json:"userItem"`
}
