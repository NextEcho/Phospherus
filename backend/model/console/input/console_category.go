package input

type GetCategoryList struct {
	PageNum  int `json:"pageNum" default:"1"`   // 页码
	PageSize int `json:"pageSize" default:"10"` // 每页大小
}

type CreateCategory struct {
	ParentId  int    `json:"parentId"`
	IsVisible int    `json:"isVisible"`
	Name      string `json:"name"`
}

type UpdateCategory struct {
	Id        int    `json:"id"`
	ParentId  int    `json:"parentId"`
	IsVisible int    `json:"isVisible"`
	Name      string `json:"name"`
}

type DeleteCategory struct {
	Ids []int `json:"ids"`
}
