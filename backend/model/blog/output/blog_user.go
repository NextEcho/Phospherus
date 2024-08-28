package output

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
