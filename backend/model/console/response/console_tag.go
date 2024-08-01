package response

import commonresp "phospherus/model/common/response"

type GetTagList struct {
	commonresp.PageResponse
	TagList any `json:"tagList"`
}

type CreateTag struct {
}

type DeleteTag struct {
}

type UpdateTag struct {
}
