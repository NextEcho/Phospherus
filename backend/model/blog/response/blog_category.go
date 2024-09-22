package response

import "phospherus/model/common"

type GetCategoryList struct {
	common.PageResponse
	CategoryList any `json:"categoryList"`
}
