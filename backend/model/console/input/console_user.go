package input

type Login struct {
	Passport string `json:"passport"`
	Password string `json:"password"`
}

type GetUserList struct {
	PageNum  int `json:"pageNum" default:"1"`
	PageSize int `json:"pageSize" default:"10"`
}

type GetUserInfo struct {
	Id int `json:"id"`
}
