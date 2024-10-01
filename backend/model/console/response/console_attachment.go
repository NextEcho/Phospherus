package response

import "phospherus/model/common"

type UploadAttachment struct {
	Url string `json:"url"`
}

type GetAttachment struct {
	Id        int    `json:"id"`
	Type      int    `json:"type"`
	TypeName  string `json:"typeName"`
	Size      int    `json:"size"`
	CreatorId int    `json:"creatorId"`
	Url       string `json:"url"`
	Name      string `json:"name"`
	Ext       string `json:"ext"`
	Creator   string `json:"creator"`
	CreatedAt string `json:"createdAt"`
}

type DeleteAttachment struct {
}

type GetAttachmentList struct {
	common.PageResponse
	AttachmentList any `json:"attachmentList"`
}
