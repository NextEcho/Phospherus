package model

import "time"

type Article struct {
	Id          int       `json:"id"`
	Titlee      string    `json:"title"`
	Content     string    `json:"content"`
	Cover       string    `json:"cover"`
	Description string    `json:"description"`
	IsVisible   bool      `json:"is_visible"`
	IsAbout     bool      `json:"is_about"`
	CategoryId  int       `json:"category_id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
