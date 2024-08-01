package model

import "time"

type Article struct {
	Id          int       `json:"id"`
	AuthorId    int       `json:"authorId"`
	CategoryId  int       `json:"categoryId"`
	Title       string    `json:"title"`
	Content     string    `json:"content"`
	Cover       string    `json:"cover"`
	Description string    `json:"description"`
	IsVisible   int       `json:"isVisible"`
	IsAbout     int       `json:"isAbout"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

func (*Article) TableName() string {
	return "article"
}
