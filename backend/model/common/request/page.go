package commonreq

// PageRequest 分页请求数据
type PageRequest struct {
	PageNum  int         `json:"page_num"`  // 页码
	PageSize int         `json:"page_size"` // 每页大小
	Key      interface{} `json:"key"`       // 查询关键字
}
