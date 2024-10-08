package input

type SaveAttachment struct {
	CreatorId int    `json:"creatorId"`
	Url       string `json:"url"`
	Name      string `json:"name"`
	Ext       string `json:"ext"`
	Type      int    `json:"type"`
	Size      int    `json:"size"`
}

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
