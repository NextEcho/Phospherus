package output

import (
	"phospherus/model"
	commonresp "phospherus/model/common/response"
)

type GetTagList struct {
	commonresp.PageResponse
	TagList []model.Tag `json:"tag_list"`
}

type CreateTag struct {
}

type DeleteTag struct {
}

type UpdateTag struct {
}
