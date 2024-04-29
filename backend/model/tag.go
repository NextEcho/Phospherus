package model

type Tag struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	IsVisible int    `json:"is_visible"`
}

func (*Tag) TableName() string {
	return "tag"
}
