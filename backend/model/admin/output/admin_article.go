package output

import (
	"phospherus/model"
	commonresp "phospherus/model/common/response"
)

type ArticleItem struct {
	Id           int      `json:"id"`
	CategoryId   int      `json:"category_id"`
	TagIds       []int    `json:"tag_ids"`
	Title        string   `json:"title"`
	Cover        string   `json:"cover"`
	Description  string   `json:"description"`
	CategoryName string   `json:"category_name"`
	TagNames     []string `json:"tag_names"`
}

type GetArticleDetail struct {
	model.Article
	Avatar       string   `json:"avatar"`
	AuthorName   string   `json:"author_name"`
	CategoryName string   `json:"category_name"`
	TagNames     []string `json:"tag_names"`
}

type GetArticleList struct {
	commonresp.PageResult
	ArticleList []ArticleItem `json:"article_list"`
}

type PostArticle struct {
}

type DeleteArticle struct{}

type UpdateArticle struct{}
