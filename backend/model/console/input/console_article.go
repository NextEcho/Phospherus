package input

type GetArticleDetail struct {
	Id int `json:"id"`
}

type GetArticleList struct {
	PageNum  int    `json:"pageNum" default:"1"`   // 页码
	PageSize int    `json:"pageSize" default:"10"` // 每页大小
	Title    string `json:"title,omitempty"`       // 通过 Title 过滤文章列表
	TagIds   []int  `json:"tagIds,omitempty"`      // 通过 TagIds 过滤文章列表
}

type PostArticle struct {
	Title     string `json:"title"`
	Cover     string `json:"cover"`
	Content   string `json:"content"`
	AuthorId  int    `json:"authorId"`
	IsVisible int    `json:"isVisible"`
	IsAbout   int    `json:"isAbout"`
	Status    int    `json:"status"`
	TagIds    []int  `json:"tagIds"`
}

type DeleteArticle struct {
	Ids []int `json:"ids"`
}

type UpdateArticle struct {
	Id        int    `json:"id"`
	Title     string `json:"title"`
	Cover     string `json:"cover"`
	Content   string `json:"content"`
	AuthorId  int    `json:"authorId"`
	IsVisible int    `json:"isVisible"`
	IsAbout   int    `json:"isAbout"`
	Status    int    `json:"status"`
	TagIds    []int  `json:"tagIds"`
}

type GetArticleListByTag struct {
	PageNum  int `json:"pageNum" default:"1"`   // 页码
	PageSize int `json:"pageSize" default:"10"` // 每页大小
	TagId    int `json:"tagId"`                 // 通过 TagIds 过滤文章列表
}
