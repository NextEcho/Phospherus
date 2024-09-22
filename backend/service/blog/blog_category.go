package blog

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/blog/input"
	"phospherus/model/blog/output"
	"phospherus/model/common"
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
