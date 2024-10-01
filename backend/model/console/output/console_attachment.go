package output

type SaveAttachment struct {
}

type GetAttachment struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Url       string `json:"url"`
	Ext       string `json:"ext"`
	Type      int    `json:"type"`
	Size      int    `json:"size"`
	CreatorId int    `json:"creator_id"`
	Creator   string `json:"creator"`
	CreatedAt string `json:"created_at"`
}

type DeleteAttachment struct{}
