package input

type GetArticleDetail struct {
	Id int `json:"id"`
}

type GetArticleList struct {
	PageNum  int `json:"pageNum" default:"1"`   // 页码
	PageSize int `json:"pageSize" default:"10"` // 每页大小
}
