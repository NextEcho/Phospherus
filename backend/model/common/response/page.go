package commonresp

// PageResult 分页查询响应结构体
type PageResponse struct {
	PageNum  int   `json:"pageNum"`
	PageSize int   `json:"pageSize"`
	Total    int64 `json:"total"`
}
