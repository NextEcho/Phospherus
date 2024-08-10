package request

import commonreq "phospherus/model/common/request"

type GetArticleDetail struct {
	Id int `json:"id"`
}

type GetArticleList struct {
	commonreq.PageRequest
	Title      string `json:"title,omitempty"`      // 通过 Title 过滤文章列表
	CategoryId int    `json:"categoryId,omitempty"` // 通过 CategoryId 过滤文章列表
	TagIds     []int  `json:"tagIds,omitempty"`     // 通过 TagIds 过滤文章列表
}

type PostArticle struct {
	Title      string `json:"title"`
	Cover      string `json:"cover"`
	Content    string `json:"content"`
	AuthorId   int    `json:"authorId"`
	CategoryId int    `json:"categoryId"`
	IsVisible  int    `json:"isVisible"`
	TagIds     []int  `json:"tagIds"`
}

type DeleteArticle struct {
	Ids []int `json:"ids"`
}

type UpdateArticle struct {
	Id         int    `json:"id"`
	Title      string `json:"title"`
	Cover      string `json:"cover"`
	Content    string `json:"content"`
	AuthorId   int    `json:"authorId"`
	CategoryId int    `json:"categoryId"`
	IsVisible  int    `json:"isVisible"`
	TagIds     []int  `json:"tagIds"`
}
