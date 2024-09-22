package request

import "phospherus/model/common"

type GetArticleDetail struct {
	Id int `json:"id"`
}

type GetArticleList struct {
	common.PageRequest
}

type GetArticleListByTag struct {
	common.PageRequest
	TagId int `json:"tagId"`
}

type GetArchiveList struct{}
