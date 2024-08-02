package output

import (
	"phospherus/model"
)

type GetTagList struct {
	TagList []model.Tag `json:"tagList"`
}
