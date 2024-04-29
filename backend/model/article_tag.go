package model

type ArticleTag struct {
	ArticleId int `json:"article_id"`
	TagId     int `json:"tag_id"`
}

func (*ArticleTag) TableName() string {
	return "article_tag"
}
