package blog

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/blog/input"
	"phospherus/model/blog/output"
	commonresp "phospherus/model/common/response"

	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

type ArticleService struct {
}

// GetArticleDetail 查询文章详情
func (*ArticleService) GetArticleDetail(in *input.GetArticleDetail) (out *output.GetArticleDetail, err error) {
	out = &output.GetArticleDetail{}

	err = global.DB.Transaction(func(tx *gorm.DB) error {
		// 根据文章 ID 查询文章详情
		articleEntity := model.Article{}
		err = tx.Table("article").Where("id = ?", in.Id).First(&articleEntity).Error
		if err != nil {
			return err
		}
		if err = copier.Copy(out, articleEntity); err != nil {
			return err
		}

		// 再查询文章的作者信息，也就是博主信息
		userEntity := model.User{}
		err = tx.Table("user").Where("id = ?", articleEntity.AuthorId).First(&userEntity).Error
		if err != nil {
			return err
		}
		out.AuthorName = userEntity.Nickname // 博主昵称
		out.Avatar = userEntity.Avatar       // 博主头像

		// 查询文章的分类信息
		categoryEntity := model.Category{}
		err = tx.Table("category").Where("id = ?", articleEntity.CategoryId).First(&categoryEntity).Error
		if err != nil {
			return err
		}
		out.CategoryName = categoryEntity.Name

		// 查询文章的标签信息
		tagEntityArr := []*model.Tag{}
		tagNames := []string{}
		// select tag.id, tag.name from tag left join article_tag at on at.tag_id = tag.id and at.article_id = 1
		err = tx.Table("tag").
			Joins("right join article_tag on article_tag.tag_id = tag.id").
			Where("article_tag.article_id = ?", articleEntity.Id).
			Find(&tagEntityArr).Error
		if err != nil {
			return err
		}
		for _, tag := range tagEntityArr {
			tagNames = append(tagNames, tag.Name)
		}
		out.TagNames = tagNames

		return nil
	})

	return
}

// GetArticleList 获取文章列表
func (*ArticleService) GetArticleList(in *input.GetArticleList) (out *output.GetArticleList, err error) {
	out = &output.GetArticleList{
		PageResponse: commonresp.PageResponse{
			PageNum:  in.PageNum,
			PageSize: in.PageSize,
		},
		ArticleList: make([]output.ArticleItem, 0),
	}

	err = global.DB.Transaction(func(tx *gorm.DB) error {

		// 查询文章总数 Total
		tx.Table("article").Count(&out.Total)

		// 查询文章列表
		articleList := []*model.Article{}
		err := tx.Table("article").Offset(in.PageSize * (in.PageNum - 1)).Limit(in.PageSize).Find(&articleList).Error
		if err != nil {
			return err
		}
		copier.Copy(&out.ArticleList, articleList)

		// 查询文章所属分类
		for idx, article := range out.ArticleList {
			categoryEntity := model.Category{}
			err := tx.Table("category").Where("id = ?", article.CategoryId).First(&categoryEntity).Error
			if err != nil {
				return err
			}
			out.ArticleList[idx].CategoryName = categoryEntity.Name
		}

		// 查询文章所属标签数组
		for idx, article := range out.ArticleList {
			tagEntityArr := []*model.Tag{}
			err := tx.Table("tag").
				Joins("right join article_tag on article_tag.tag_id = tag.id").
				Where("article_tag.article_id = ?", article.Id).
				Find(&tagEntityArr).Error
			if err != nil {
				return err
			}
			// 填充 tagIds
			out.ArticleList[idx].TagIds = make([]int, 0)
			for _, tag := range tagEntityArr {
				out.ArticleList[idx].TagIds = append(out.ArticleList[idx].TagIds, tag.Id)
			}

			// 填充 tagNames
			out.ArticleList[idx].TagNames = make([]string, 0)
			for _, tag := range tagEntityArr {
				out.ArticleList[idx].TagNames = append(out.ArticleList[idx].TagNames, tag.Name)
			}
		}

		return nil
	})

	return
}
