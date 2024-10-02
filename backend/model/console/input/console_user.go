package input

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
	PageNum  int `json:"pageNum" default:"1"`
	PageSize int `json:"pageSize" default:"10"`
}

type GetUserInfo struct {
	Id int `json:"id"`
}

type DeleteUser struct {
	Id int `json:"id"`
}
