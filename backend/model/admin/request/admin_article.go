package request

import commonreq "phospherus/model/common/request"

type GetArticleDetail struct {
	Id int `json:"id"`
}

type GetArticleList struct {
	commonreq.PageRequest
	Title      string `json:"title,omitempty"`       // 通过 Title 过滤文章列表
	CategoryId int    `json:"category_id,omitempty"` // 通过 CategoryId 过滤文章列表
	TagIds     []int  `json:"tag_ids,omitempty"`     // 通过 TagIds 过滤文章列表
}
