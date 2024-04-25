package model

type Category struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	IsVisible int    `json:"is_visible"`
}
