package response

import (
	"phospherus/model"
	commonresp "phospherus/model/common/response"
)

type GetArticleDetail struct {
	model.Article
	Avatar       string   `json:"avatar"`
	AuthorName   string   `json:"authorName"`
	CategoryName string   `json:"categoryName"`
	TagNames     []string `json:"tagNames"`
}

type GetArticleList struct {
	commonresp.PageResponse
	ArticleList any `json:"articleList"`
}

type GetArchiveList struct {
	ArchiveList any `json:"archiveList"`
}
