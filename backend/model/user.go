package model

type User struct {
	Id           int    `json:"id"`
	Passport     string `json:"passport"`
	Nickname     string `json:"nickname"`
	Password     string `json:"password"`
	Avatar       string `json:"avatar"`
	Email        string `json:"email"`
	Github       string `json:"github"`
	Introduction string `json:"introduction"`
}

func (*User) TableName() string {
	return "user"
}
