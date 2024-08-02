package output

import (
	"phospherus/model"
	commonresp "phospherus/model/common/response"
	"time"
)

type ArticleItem struct {
	Id              int       `json:"id"`
	CategoryId      int       `json:"categoryId"`
	Title           string    `json:"title"`
	Cover           string    `json:"cover"`
	Description     string    `json:"description"`
	CategoryName    string    `json:"categoryName"`
	LatestUpdatedAt string    `json:"latestUpdatedAt"`
	TagIds          []int     `json:"tagIds"`
	TagNames        []string  `json:"tagNames"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}

type ArchiveItem struct {
	Year            string            `json:"year"`
	MiniArticleList []MiniArticleItem `json:"articleList"`
}

type MiniArticleItem struct {
	DateTime string `json:"dateTime"`
	Title    string `json:"title"`
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

type GetArchiveList struct {
	ArchiveList []ArchiveItem `json:"archiveList"`
}
