package model

type Category struct {
	Id       int    `json:"id"`
	ParentId int    `json:"parentId"`
	Name     string `json:"name"`
}

func (*Category) TableName() string {
	return "category"
}
