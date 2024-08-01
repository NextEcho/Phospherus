package request

import commonreq "phospherus/model/common/request"

type GetCategoryList struct {
	commonreq.PageRequest
}

type CreateCategory struct {
	ParentId  int    `json:"parentId"`
	IsVisible int    `json:"isVisible"`
	Name      string `json:"name"`
}

type UpdateCategory struct {
	Id        int    `json:"id"`
	ParentId  int    `json:"parentId"`
	IsVisible int    `json:"isVisible"`
	Name      string `json:"name"`
}

type DeleteCategory struct {
	Ids []int `json:"ids"`
}
