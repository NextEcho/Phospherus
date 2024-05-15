package response

import commonresp "phospherus/model/common/response"

type GetTagList struct {
	commonresp.PageResponse
	TagList any `json:"tag_list"`
}
