package output

import (
	"phospherus/model"
	"phospherus/model/common"
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
	TagIds     []int    `json:"tagIds"`
}

type GetArticleList struct {
	common.PageResponse
	ArticleList []ArticleItem `json:"articleList"`
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
	ArticleList []ArticleItem `json:"articleList"`
}
