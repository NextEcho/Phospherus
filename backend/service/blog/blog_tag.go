package blog

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/blog/output"
)

type TagService struct{}

func (*TagService) GetTagList() (out *output.GetTagList, err error) {
	out = &output.GetTagList{}

	// 查询标签列表
	var tagList []model.Tag
	err = global.DB.Table("tag").Find(&tagList).Error
	if err != nil {
		return
	}
	out.TagList = tagList

	return
}
