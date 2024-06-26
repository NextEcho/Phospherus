package model

import "time"

type Article struct {
	Id          int       `json:"id"`
	AuthorId    int       `json:"author_id"`
	CategoryId  int       `json:"category_id"`
	Title       string    `json:"title"`
	Content     string    `json:"content"`
	Cover       string    `json:"cover"`
	Description string    `json:"description"`
	IsVisible   int       `json:"is_visible"`
	IsAbout     int       `json:"is_about"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (*Article) TableName() string {
	return "article"
}
