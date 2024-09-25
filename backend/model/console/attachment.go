package model

type Attachment struct {
	ID   int    `json:"id"`
	Url  string `json:"url"`
	Name string `json:"name"`
	Ext  string `json:"ext"`
	Type int    `json:"type"`
	Size int    `json:"size"`
}

func (*Attachment) TableName() string {
	return "attachment"
}
