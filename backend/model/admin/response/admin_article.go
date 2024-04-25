package response

import "time"

type GetArticleDetail struct {
	Id           int      `json:"id"`
	Title        string   `json:"title"`
	Cover        string   `json:"cover"`
	Content      string   `json:"content"`
	IsVisible    int      `json:"is_visible"`
	IsAbout      int      `json:"is_about"`
	CategoryName string   `json:"category_name"`
	Tags         []string `json:"tags"`

	AuthorName string `json:"author_name"`
	Avatar     string `json:"avatar"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
