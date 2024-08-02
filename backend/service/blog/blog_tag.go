package blog

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/blog/output"

	"github.com/jinzhu/copier"
	"go.uber.org/zap"
)

type TagService struct{}

func (*TagService) GetTagList() (out *output.GetTagList, err error) {
	out = &output.GetTagList{}

	// 查询标签列表
	var tagList []model.Tag
	err = global.DB.Table("tag").Find(&tagList).Error
	if err != nil {
		global.LOGGER.Error("query tagList Error", zap.Error(err))
		return
	}

	// query count of article linked tag
	tagItemList := []output.TagItem{}
	for _, tag := range tagList {
		tagItem := output.TagItem{}

		var count int64
		err = global.DB.Table("article_tag").Where("tag_id = ?", tag.Id).Count(&count).Error
		if err != nil {
			global.LOGGER.Error("query count of article associated with tag Error", zap.Error(err))
			return
		}

		copier.Copy(&tagItem, tag)
		tagItem.Count = int(count)
		tagItemList = append(tagItemList, tagItem)
	}

	out.TagList = tagItemList

	return
}
