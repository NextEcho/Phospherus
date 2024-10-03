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

type PostArticle struct{}

type DeleteArticle struct{}

type UpdateArticle struct{}

type GetArticleListByTag struct {
	common.PageResponse
	ArticleList any `json:"articleList"`
}
