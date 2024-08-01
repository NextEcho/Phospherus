package response

import commonresp "phospherus/model/common/response"

type GetCategoryList struct {
	commonresp.PageResponse
	CategoryList any `json:"categoryList"`
}
