package response

import "phospherus/model/common"

type GetCategoryList struct {
	common.PageResponse
	CategoryList any `json:"categoryList"`
}

type CreateCategory struct {
	ParentId  int    `json:"parentId"`
	Name      string `json:"name"`
	IsVisible int    `json:"isVisible"`
}

type DeleteCategory struct {
	Ids []int `json:"ids"`
}

type UpdateCategory struct {
	Id        int    `json:"id"`
	ParentId  int    `json:"parentId"`
	Name      string `json:"name"`
	IsVisible int    `json:"isVisible"`
}
