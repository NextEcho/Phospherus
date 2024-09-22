package console

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/common"
	"phospherus/model/console/input"
	"phospherus/model/console/output"
)

type CategoryService struct{}

func (*CategoryService) GetCategoryList(in *input.GetCategoryList) (out *output.GetCategoryList, err error) {
	out = &output.GetCategoryList{
		PageResponse: common.PageResponse{
			PageNum:  in.PageNum,
			PageSize: in.PageSize,
		},
	}

	// 查询分类总数
	err = global.DB.Table("category").Count(&out.Total).Error
	if err != nil {
		return
	}

	// 查询分类列表
	var categoryList []model.Category
	err = global.DB.Table("category").Offset(in.PageSize * (in.PageNum - 1)).Limit(in.PageSize).Find(&categoryList).Error
	if err != nil {
		return
	}
	out.CategoryList = categoryList

	return
}

func (*CategoryService) CreateCategory(in *input.CreateCategory) (out *output.CreateCategory, err error) {
	out = &output.CreateCategory{}

	err = global.DB.Table("category").Create(&model.Category{
		ParentId:  in.ParentId,
		Name:      in.Name,
		IsVisible: in.IsVisible,
	}).Error

	return
}

func (*CategoryService) DeleteCategory(in *input.DeleteCategory) (out *output.DeleteCategory, err error) {
	out = &output.DeleteCategory{}

	err = global.DB.Where("id in (?)", in.Ids).Delete(&model.Category{}).Error

	return
}

func (*CategoryService) UpdateCategory(in *input.UpdateCategory) (out *output.UpdateCategory, err error) {
	out = &output.UpdateCategory{}

	// 因为 gorm 对于零值，使用结构体更新是无效的
	// 这里使用 map[string]interface{} 来更新字段
	err = global.DB.Table("category").Where("id = ?", in.Id).Updates(map[string]interface{}{
		"parent_id":  in.ParentId,
		"is_visible": in.IsVisible,
		"name":       in.Name,
	}).Error
	return
}
