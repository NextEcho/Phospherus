package input

type GetTagList struct {
	PageNum  int `json:"page_num" default:"1"`   // 页码
	PageSize int `json:"page_size" default:"10"` // 每页大小
}

type CreateTag struct {
	Name      string `json:"name"`
	IsVisible int    `json:"is_visible"`
}

type DeleteTag struct {
	Ids []int `json:"ids"`
}

type UpdateTag struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	IsVisible int    `json:"is_visible"`
}
