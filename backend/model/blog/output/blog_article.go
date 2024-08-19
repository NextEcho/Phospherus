package output

import (
	commonresp "phospherus/model/common/response"
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

type ArchiveItem struct {
	Year        string        `json:"year"`
	ArticleList []ArticleItem `json:"articleList"`
}

type GetArticleDetail struct {
	ArticleItem
	Avatar     string   `json:"avatar"`
	AuthorName string   `json:"authorName"`
	TagNames   []string `json:"tagNames"`
}

type GetArticleList struct {
	commonresp.PageResponse
	ArticleList []ArticleItem `json:"articleList"`
}

type GetArticleListByTag struct {
	commonresp.PageResponse
	ArticleList []ArticleItem `json:"articleList"`
}

type GetArchiveList struct {
	ArchiveList []ArchiveItem `json:"archiveList"`
}
