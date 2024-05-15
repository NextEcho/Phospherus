package input

type GetCategoryList struct {
	PageNum  int `json:"page_num" default:"1"`   // 页码
	PageSize int `json:"page_size" default:"10"` // 每页大小
}
