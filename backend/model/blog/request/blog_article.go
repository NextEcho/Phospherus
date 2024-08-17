package request

import commonreq "phospherus/model/common/request"

type GetArticleDetail struct {
	Id int `json:"id"`
}

type GetArticleList struct {
	commonreq.PageRequest
}

type GetArticleListByTag struct {
	commonreq.PageRequest
	TagId int `json:"tagId"`
}

type GetArchiveList struct{}
