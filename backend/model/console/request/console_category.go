package request

import commonreq "phospherus/model/common/request"

type GetCategoryList struct {
	commonreq.PageRequest
}

type CreateCategory struct {
	ParentId  int    `json:"parent_id"`
	IsVisible int    `json:"is_visible"`
	Name      string `json:"name"`
}

type UpdateCategory struct {
	Id        int    `json:"id"`
	ParentId  int    `json:"parent_id"`
	IsVisible int    `json:"is_visible"`
	Name      string `json:"name"`
}

type DeleteCategory struct {
	Ids []int `json:"ids"`
}
