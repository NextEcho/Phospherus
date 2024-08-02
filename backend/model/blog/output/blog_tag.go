package output

import (
	"phospherus/model"
)

type TagItem struct {
	model.Tag
	Count int `json:"count"`
}

type GetTagList struct {
	TagList []TagItem `json:"tagList"`
}
