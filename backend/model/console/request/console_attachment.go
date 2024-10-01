package request

type GetAttachment struct {
	Id int `json:"id"`
}

type DeleteAttachment struct {
	Id int `json:"id"`
}

type GetAttachmentList struct {
	PageNum  int `json:"pageNum"`
	PageSize int `json:"pageSize"`
}
