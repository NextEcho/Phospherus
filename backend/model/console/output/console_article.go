package output

import (
	"phospherus/model"
	commonresp "phospherus/model/common/response"
)

type ArticleItem struct {
	Id          int      `json:"id"`
	TagIds      []int    `json:"tagIds"`
	Title       string   `json:"title"`
	Cover       string   `json:"cover"`
	Description string   `json:"description"`
	TagNames    []string `json:"tagNames"`
}

type GetArticleDetail struct {
	model.Article
	Avatar     string   `json:"avatar"`
	AuthorName string   `json:"authorName"`
	TagNames   []string `json:"tagNames"`
}

type GetArticleList struct {
	commonresp.PageResponse
	ArticleList []ArticleItem `json:"articleList"`
}

type PostArticle struct {
}

type DeleteArticle struct{}

type UpdateArticle struct{}
