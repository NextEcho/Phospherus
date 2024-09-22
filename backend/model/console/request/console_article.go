package request

import (
	"phospherus/model/common"
)

type GetArticleDetail struct {
	Id int `json:"id"`
}

type GetArticleList struct {
	common.PageRequest
	Title  string `json:"title,omitempty"`  // 通过 Title 过滤文章列表
	TagIds []int  `json:"tagIds,omitempty"` // 通过 TagIds 过滤文章列表
}

type PostArticle struct {
	Title     string `json:"title"`
	Cover     string `json:"cover"`
	Content   string `json:"content"`
	AuthorId  int    `json:"authorId"`
	IsVisible int    `json:"isVisible"`
	Status    int    `json:"status"`
	TagIds    []int  `json:"tagIds"`
}

type DeleteArticle struct {
	Ids []int `json:"ids"`
}

type UpdateArticle struct {
	Id        int    `json:"id"`
	Title     string `json:"title"`
	Cover     string `json:"cover"`
	Content   string `json:"content"`
	AuthorId  int    `json:"authorId"`
	IsVisible int    `json:"isVisible"`
	Status    int    `json:"status"`
	TagIds    []int  `json:"tagIds"`
}

type GetArticleListByTag struct {
	common.PageRequest
	TagId int `json:"tagId"`
}
