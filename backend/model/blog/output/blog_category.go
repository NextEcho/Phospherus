package output

import (
	"phospherus/model"
	"phospherus/model/common"
)

type GetCategoryList struct {
	common.PageResponse
	CategoryList []model.Category `json:"categoryList"`
}
