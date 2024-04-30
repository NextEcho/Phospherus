package admin

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/admin/input"
	"phospherus/model/admin/output"
	commonresp "phospherus/model/common/response"
	"phospherus/pkg"

	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

type ArticleService struct{}

// GetArticleDetail 查询文章详情
// 在 admin 端用于查看和修改文章
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

// GetArticleList 分页获取文章列表
// TODO: 需要实现根据 title 过滤文章列表
// 后续还需要实现聚合查询，title、categoryId、tagIds
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

// DeleteArticle 删除文章，可批量删除和删除单个
func (*ArticleService) DeleteArticle(in *input.DeleteArticle) (out *output.DeleteArticle, err error) {
	out = &output.DeleteArticle{}

	err = global.DB.Transaction(func(tx *gorm.DB) error {
		// 删除文章数据
		err := tx.Where("id in (?)", in.Ids).Delete(&model.Article{}).Error
		if err != nil {
			return err
		}

		// 删除文章相关联的 tag ids 信息数据
		err = tx.Where("article_id in (?)", in.Ids).Delete(&model.ArticleTag{}).Error
		if err != nil {
			return err
		}

		return nil
	})

	return
}

// PostArticle 发布文章
func (*ArticleService) PostArticle(in *input.PostArticle) (out *output.PostArticle, err error) {
	out = &output.PostArticle{}

	err = global.DB.Transaction(func(tx *gorm.DB) error {
		// 插入文章数据
		article := model.Article{
			CategoryId:  in.CategoryId,
			Title:       in.Title,
			IsVisible:   in.IsVisible,
			IsAbout:     in.IsAbout,
			Content:     in.Content,
			Cover:       in.Cover,
			AuthorId:    in.AuthorId,
			Description: pkg.GenDescription(in.Content),
		}
		err := tx.Create(&article).Error
		if err != nil {
			return err
		}

		// 插入文章标签关联数据
		for _, tagId := range in.TagIds {
			err := tx.Create(&model.ArticleTag{
				ArticleId: article.Id,
				TagId:     tagId,
			}).Error
			if err != nil {
				return err
			}
		}
		return nil
	})

	return
}

// UpdateArticle 更新文章
func (*ArticleService) UpdateArticle(in *input.UpdateArticle) (out *output.UpdateArticle, err error) {
	out = &output.UpdateArticle{}

	err = global.DB.Transaction(func(tx *gorm.DB) error {

		// 更新文章数据
		err := tx.Model(&model.Article{}).Where("id = ?", in.Id).Updates(map[string]interface{}{
			"category_id": in.CategoryId,
			"title":       in.Title,
			"is_visible":  in.IsVisible,
			"is_about":    in.IsAbout,
			"content":     in.Content,
			"cover":       in.Cover,
			"author_id":   in.AuthorId,
			"description": pkg.GenDescription(in.Content),
		}).Error
		if err != nil {
			return err
		}

		// 先删除原先文章标签关联数据
		err = tx.Where("article_id = ?", in.Id).Delete(&model.ArticleTag{}).Error
		if err != nil {
			return err
		}
		// 再插入新的文章标签关联数据
		for _, tagId := range in.TagIds {
			err := tx.Create(&model.ArticleTag{
				ArticleId: in.Id,
				TagId:     tagId,
			}).Error
			if err != nil {
				return err
			}
		}
		return nil
	})

	return
}
