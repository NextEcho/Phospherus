package model

type Category struct {
	Id        int    `json:"id"`
	ParentId  int    `json:"parentId"`
	Name      string `json:"name"`
	IsVisible int    `json:"isVisible"`
}

func (*Category) TableName() string {
	return "category"
}
