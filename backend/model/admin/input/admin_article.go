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

type PostArticle struct {
	Title      string `json:"title"`
	Cover      string `json:"cover"`
	Content    string `json:"content"`
	AuthorId   int    `json:"author_id"`
	CategoryId int    `json:"category_id"`
	IsVisible  int    `json:"is_visible"`
	IsAbout    int    `json:"is_about"`
}

type DeleteArticle struct {
	Ids []int `json:"ids"`
}

type UpdateArticle struct {
	Id         int    `json:"id"`
	Title      string `json:"title"`
	Cover      string `json:"cover"`
	Content    string `json:"content"`
	AuthorId   int    `json:"author_id"`
	CategoryId int    `json:"category_id"`
	IsVisible  int    `json:"is_visible"`
	IsAbout    int    `json:"is_about"`
}
