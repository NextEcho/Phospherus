package model

import "time"

type Article struct {
	Id          int       `json:"id"`
	AuthorId    int       `json:"authorId"`
	Title       string    `json:"title"`
	Content     string    `json:"content"`
	Cover       string    `json:"cover"`
	Description string    `json:"description"`
	IsVisible   int       `json:"isVisible"`
	Status      int       `json:"status"`
	ViewCount   int       `json:"viewCount"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

func (*Article) TableName() string {
	return "article"
}
