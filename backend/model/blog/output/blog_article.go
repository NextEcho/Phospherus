package output

import (
	"phospherus/model"
	commonresp "phospherus/model/common/response"
)

type ArticleItem struct {
	Id           int      `json:"id"`
	CategoryId   int      `json:"categoryId"`
	TagIds       []int    `json:"tagIds"`
	Title        string   `json:"title"`
	Cover        string   `json:"cover"`
	Description  string   `json:"description"`
	CategoryName string   `json:"categoryName"`
	TagNames     []string `json:"tagNames"`
}

type GetArticleDetail struct {
	model.Article
	Avatar       string   `json:"avatar"`
	AuthorName   string   `json:"authorName"`
	CategoryName string   `json:"categoryName"`
	TagNames     []string `json:"tagNames"`
}

type GetArticleList struct {
	commonresp.PageResponse
	ArticleList []ArticleItem `json:"articleList"`
}
