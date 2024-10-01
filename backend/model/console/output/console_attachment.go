package output

import "phospherus/model/common"

type AttachmentItem struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Url       string `json:"url"`
	Ext       string `json:"ext"`
	Size      int    `json:"size"`
	Type      int    `json:"type"`
	TypeName  string `json:"typeName"`
	CreatorId int    `json:"creatorId"`
	Creator   string `json:"creator"`
	CreatedAt string `json:"createdAt"`
}

type SaveAttachment struct {
}

type GetAttachment struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Url       string `json:"url"`
	Ext       string `json:"ext"`
	Type      int    `json:"type"`
	Size      int    `json:"size"`
	TypeName  string `json:"typeName"`
	CreatorId int    `json:"creatorId"`
	Creator   string `json:"creator"`
	CreatedAt string `json:"createdAt"`
}

type DeleteAttachment struct{}

type GetAttachmentList struct {
	common.PageResponse
	AttachmentList []AttachmentItem `json:"attachmentList"`
}
