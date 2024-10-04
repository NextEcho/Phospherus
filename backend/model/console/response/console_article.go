package response

import (
	"phospherus/model"
	"phospherus/model/common"
)

type GetArticleDetail struct {
	model.Article
	Avatar     string   `json:"avatar"`
	AuthorName string   `json:"authorName"`
	TagNames   []string `json:"tagNames"`
	TagIds     []int    `json:"tagIds"`
}

type GetArticleList struct {
	common.PageResponse
	ArticleList any `json:"articleList"`
}

type PostArticle struct {
	Id int `json:"id"`
}

type DeleteArticle struct{}

type UpdateArticle struct {
	Id int `json:"id"`
}

type GetArticleListByTag struct {
	common.PageResponse
	ArticleList any `json:"articleList"`
}
