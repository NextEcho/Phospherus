package output

type SaveAttachment struct {
}

type GetAttachment struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Url  string `json:"url"`
	Ext  string `json:"ext"`
	Type int    `json:"type"`
	Size int    `json:"size"`
}

type DeleteAttachment struct{}
