package model

type FriendLink struct {
	Id   int    `json:"id"`
	Url  string `json:"url"`
	Name string `json:"name"`
	Icon string `json:"icon"`
}

func (*FriendLink) TableName() string {
	return "friend_link"
}
