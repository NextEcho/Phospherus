package response

import (
	"phospherus/model"
	commonresp "phospherus/model/common/response"
)

type GetArticleDetail struct {
	model.Article
	Avatar     string   `json:"avatar"`
	AuthorName string   `json:"authorName"`
	TagNames   []string `json:"tagNames"`
}

type GetArticleList struct {
	commonresp.PageResponse
	ArticleList any `json:"articleList"`
}

type PostArticle struct{}

type DeleteArticle struct{}

type UpdateArticle struct{}

type GetArticleListByTag struct {
	commonresp.PageResponse
	ArticleList any `json:"articleList"`
}
