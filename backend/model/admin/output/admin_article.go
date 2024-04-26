package output

import "phospherus/model"

type GetArticleDetail struct {
	model.Article
	Avatar       string   `json:"avatar"`
	AuthorName   string   `json:"author_name"`
	CategoryName string   `json:"category_name"`
	TagNames     []string `json:"tag_names"`
}
