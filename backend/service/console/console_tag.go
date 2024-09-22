package console

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model"
	"phospherus/model/common"
	"phospherus/model/console/input"
	"phospherus/model/console/output"

	"gorm.io/gorm"
)

type TagService struct{}

func (*TagService) GetTagList(in *input.GetTagList) (out *output.GetTagList, err error) {
	out = &output.GetTagList{
		PageResponse: common.PageResponse{
			PageNum:  in.PageNum,
			PageSize: in.PageSize,
		},
		TagList: []output.TagItem{},
	}

	// 查询标签总数
	err = global.DB.Table("tag").Count(&out.Total).Error
	if err != nil {
		return
	}

	// 查询标签列表
	var tagList []model.Tag
	err = global.DB.Table("tag").Offset(in.PageSize * (in.PageNum - 1)).Limit(in.PageSize).Find(&tagList).Error
	if err != nil {
		return
	}

	// 查询标签下的文章数量
	for _, tag := range tagList {

		var count int64
		err = global.DB.Table("article_tag").Where("tag_id =?", tag.Id).Count(&count).Error
		if err != nil {
			return
		}

		tagItem := output.TagItem{
			Id:              tag.Id,
			Name:            tag.Name,
			BackgroundColor: tag.BackgroundColor,
		}

		tagItem.ArticleCount = int(count)
		out.TagList = append(out.TagList, tagItem)
	}

	return
}

func (*TagService) CreateTag(in *input.CreateTag) (out *output.CreateTag, err error) {
	out = &output.CreateTag{}

	// 判断标签名是否存在
	var count int64
	if err = global.DB.Table("tag").Where("name =?", in.Name).Count(&count).Error; err != nil {
		return
	}
	if count != 0 {
		err = biz.ErrTagExist
		return
	}

	err = global.DB.Table("tag").Create(&model.Tag{
		Name:            in.Name,
		BackgroundColor: in.BackgroundColor,
	}).Error

	return
}

func (*TagService) DeleteTag(in *input.DeleteTag) (out *output.DeleteTag, err error) {
	out = &output.DeleteTag{}

	err = global.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("id in (?)", in.Ids).Delete(&model.Tag{}).Error; err != nil {
			return err
		}

		if err := tx.Where("tag_id in (?)", in.Ids).Delete(&model.ArticleTag{}).Error; err != nil {
			return err
		}

		return nil
	})

	return
}

func (*TagService) UpdateTag(in *input.UpdateTag) (out *output.UpdateTag, err error) {
	out = &output.UpdateTag{}

	// 因为 gorm 对于零值，使用结构体更新是无效的
	// 这里使用 map[string]interface{} 来更新字段
	err = global.DB.Table("tag").Where("id = ?", in.Id).Updates(map[string]interface{}{
		"name":             in.Name,
		"background_color": in.BackgroundColor,
	}).Error

	return
}
