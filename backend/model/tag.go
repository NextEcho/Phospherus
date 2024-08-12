package model

type Tag struct {
	Id              int    `json:"id"`
	Name            string `json:"name"`
	BackgroundColor string `json:"backgroundColor"`
}

func (*Tag) TableName() string {
	return "tag"
}
