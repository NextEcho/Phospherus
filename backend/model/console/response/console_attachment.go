package response

type UploadAttachment struct {
	Url string `json:"url"`
}

type GetAttachment struct {
	Id        int    `json:"id"`
	Type      int    `json:"type"`
	Size      int    `json:"size"`
	CreatorId int    `json:"creator_id"`
	Url       string `json:"url"`
	Name      string `json:"name"`
	Ext       string `json:"ext"`
	Creator   string `json:"creator"`
	CreatedAt string `json:"created_at"`
}

type DeleteAttachment struct {
}
