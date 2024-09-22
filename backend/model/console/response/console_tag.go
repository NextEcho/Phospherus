package response

import "phospherus/model/common"

type GetTagList struct {
	common.PageResponse
	TagList any `json:"tagList"`
}

type CreateTag struct {
}

type DeleteTag struct {
}

type UpdateTag struct {
}
