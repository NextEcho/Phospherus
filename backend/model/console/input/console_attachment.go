package input

type SaveAttachment struct {
	Url  string `json:"url"`
	Name string `json:"name"`
	Ext  string `json:"ext"`
	Type int    `json:"type"`
	Size int    `json:"size"`
}

type GetAttachment struct {
	ID int `json:"id"`
}

type DeleteAttachment struct {
	ID int `json:"id"`
}
