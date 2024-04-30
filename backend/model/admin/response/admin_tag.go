package response

import commonresp "phospherus/model/common/response"

type GetTagList struct {
	commonresp.PageResponse
	TagList any `json:"tag_list"`
}

type CreateTag struct {
}

type DeleteTag struct {
}

type UpdateTag struct {
}
