package output

import (
	commonresp "phospherus/model/common/response"
)

type TagItem struct {
	Id              int    `json:"id"`
	Name            string `json:"name"`
	BackgroundColor string `json:"backgroundColor"`
	ArticleCount    int    `json:"articleCount"`
}

type GetTagList struct {
	commonresp.PageResponse
	TagList []TagItem `json:"tagList"`
}

type CreateTag struct {
}

type DeleteTag struct {
}

type UpdateTag struct {
}
