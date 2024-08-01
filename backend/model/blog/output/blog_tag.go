package output

import (
	"phospherus/model"
	commonresp "phospherus/model/common/response"
)

type GetTagList struct {
	commonresp.PageResponse
	TagList []model.Tag `json:"tagList"`
}
