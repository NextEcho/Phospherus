package model

import "time"

type Attachment struct {
	Id        int       `json:"id"`
	CreatorId int       `json:"creator_id"`
	Url       string    `json:"url"`
	Name      string    `json:"name"`
	Ext       string    `json:"ext"`
	Type      int       `json:"type"`
	Size      int       `json:"size"`
	CreatedAt time.Time `json:"created_at"`
}

func (*Attachment) TableName() string {
	return "attachment"
}
