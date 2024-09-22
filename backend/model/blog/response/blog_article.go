package response

import (
	"phospherus/model/common"
)

type ArticleItem struct {
	Id          int      `json:"id"`
	IsVisible   int      `json:"isVisible"`
	Title       string   `json:"title"`
	Cover       string   `json:"cover"`
	Content     string   `json:"content"`
	Description string   `json:"description"`
	CreatedAt   string   `json:"createdAt"`
	UpdatedAt   string   `json:"updatedAt"`
	TagNames    []string `json:"tagNames"`
	TagIds      []int    `json:"tagIds"`
}

type GetArticleDetail struct {
	ArticleItem
	Avatar     string   `json:"avatar"`
	AuthorName string   `json:"authorName"`
	TagNames   []string `json:"tagNames"`
}

type GetArticleList struct {
	common.PageResponse
	ArticleList any `json:"articleList"`
}

type GetArticleListByTag struct {
	common.PageResponse
	ArticleList any `json:"articleList"`
}

type GetArchiveList struct {
	ArchiveList any `json:"archiveList"`
}
