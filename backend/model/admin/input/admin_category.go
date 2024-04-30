package input

type GetCategoryList struct {
	PageNum  int `json:"page_num" default:"1"`   // 页码
	PageSize int `json:"page_size" default:"10"` // 每页大小
}

type CreateCategory struct {
	ParentId  int    `json:"parent_id"`
	IsVisible int    `json:"is_visible"`
	Name      string `json:"name"`
}

type UpdateCategory struct {
	Id        int    `json:"id"`
	ParentId  int    `json:"parent_id"`
	IsVisible int    `json:"is_visible"`
	Name      string `json:"name"`
}

type DeleteCategory struct {
	Ids []int `json:"ids"`
}
