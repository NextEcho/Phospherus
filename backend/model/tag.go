package model

type Tag struct {
	Id              int    `json:"id"`
	Name            string `json:"name"`
	BackgroundColor string `json:"backgroundColor"`
	IsVisible       int    `json:"isVisible"`
}

func (*Tag) TableName() string {
	return "tag"
}
