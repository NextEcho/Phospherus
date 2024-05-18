package output

import (
	"phospherus/model"
	commonresp "phospherus/model/common/response"
)

type GetCategoryList struct {
	commonresp.PageResponse
	CategoryList []model.Category `json:"category_list"`
}
