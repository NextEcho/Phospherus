package model

type ArticleTag struct {
	ArticleId int `json:"articleId"`
	TagId     int `json:"tagId"`
}

func (*ArticleTag) TableName() string {
	return "article_tag"
}
