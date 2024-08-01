package input

type GetArticleDetail struct {
	Id int `json:"id"`
}

type GetArticleList struct {
	PageNum    int    `json:"pageNum" default:"1"`   // 页码
	PageSize   int    `json:"pageSize" default:"10"` // 每页大小
	Title      string `json:"title,omitempty"`       // 通过 Title 过滤文章列表
	CategoryId int    `json:"categoryId,omitempty"`  // 通过 CategoryId 过滤文章列表
	TagIds     []int  `json:"tagIds,omitempty"`      // 通过 TagIds 过滤文章列表
}

type PostArticle struct {
	Title      string `json:"title"`
	Cover      string `json:"cover"`
	Content    string `json:"content"`
	AuthorId   int    `json:"authorId"`
	CategoryId int    `json:"categoryId"`
	IsVisible  int    `json:"isVisible"`
	IsAbout    int    `json:"isAbout"`
	TagIds     []int  `json:"tagIds"`
}

type DeleteArticle struct {
	Ids []int `json:"ids"`
}

type UpdateArticle struct {
	Id         int    `json:"id"`
	Title      string `json:"title"`
	Cover      string `json:"cover"`
	Content    string `json:"content"`
	AuthorId   int    `json:"authorId"`
	CategoryId int    `json:"categoryId"`
	IsVisible  int    `json:"isVisible"`
	IsAbout    int    `json:"isAbout"`
	TagIds     []int  `json:"tagIds"`
}
