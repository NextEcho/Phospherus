package admin

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/admin/request"
	"phospherus/model/admin/response"

	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

type ArticleService struct{}

// GetArticleDetail 查询文章详情
// 在 admin 端用于查看和修改文章
func (*ArticleService) GetArticleDetail(in *request.GetArticleDetail) (out *response.GetArticleDetail, err error) {
	out = &response.GetArticleDetail{}

	err = global.DB.Transaction(func(tx *gorm.DB) error {

		// 根据文章 ID 查询文章详情
		articleDetail := model.Article{}
		global.DB.Table("article").Where("id = ?", in.Id).First(&articleDetail)
		if err = copier.Copy(out, articleDetail); err != nil {
			return err
		}

		// 再查询文章的作者信息，也就是博主信息
		userDetail := model.User{}
		global.DB.Table("user").Where("id = ?", articleDetail.AuthorId).First(&userDetail)
		out.AuthorName = userDetail.Nickname // 博主昵称
		out.Avatar = userDetail.Avatar       // 博主头像

		// TODO: 查询文章的分类信息

		// TODO: 查询文章的标签信息

		return nil
	})

	return
}
