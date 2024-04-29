package model

type User struct {
	Id        int    `json:"id"`
	Passport  string `json:"passport"`
	Nickname  string `json:"nickname"`
	Password  string `json:"password"`
	Avatar    string `json:"avatar"`
	Signature string `json:"signature"`
	Email     string `json:"email"`
}

func (*User) TableName() string {
	return "user"
}
