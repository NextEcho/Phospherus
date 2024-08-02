package request

import commonreq "phospherus/model/common/request"

type GetArticleDetail struct {
	Id int `json:"id"`
}

type GetArticleList struct {
	commonreq.PageRequest
}

type GetArchiveList struct {
}
