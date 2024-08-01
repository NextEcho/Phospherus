package input

type GetTagList struct {
	PageNum  int `json:"pageNum" default:"1"`   // 页码
	PageSize int `json:"pageSize" default:"10"` // 每页大小
}

type CreateTag struct {
	Name      string `json:"name"`
	IsVisible int    `json:"isVisible"`
}

type DeleteTag struct {
	Ids []int `json:"ids"`
}

type UpdateTag struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	IsVisible int    `json:"isVisible"`
}
