package response

import commonresp "phospherus/model/common/response"

type GetCategoryList struct {
	commonresp.PageResponse
	CategoryList any `json:"category_list"`
}

type CreateCategory struct {
	ParentId  int    `json:"parent_id"`
	Name      string `json:"name"`
	IsVisible int    `json:"is_visible"`
}

type DeleteCategory struct {
	Ids []int `json:"ids"`
}

type UpdateCategory struct {
	Id        int    `json:"id"`
	ParentId  int    `json:"parent_id"`
	Name      string `json:"name"`
	IsVisible int    `json:"is_visible"`
}
