package input

type GetArticleDetail struct {
	Id int `json:"id"`
}

type GetArticleList struct {
	PageNum    int    `json:"page_num" default:"1"`   // 页码
	PageSize   int    `json:"page_size" default:"10"` // 每页大小
	Title      string `json:"title,omitempty"`        // 通过 Title 过滤文章列表
	CategoryId int    `json:"category_id,omitempty"`  // 通过 CategoryId 过滤文章列表
	TagIds     []int  `json:"tag_ids,omitempty"`      // 通过 TagIds 过滤文章列表
}
