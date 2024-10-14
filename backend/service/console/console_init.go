package console

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/console/input"
	"phospherus/model/console/output"
	"phospherus/pkg"

	"gorm.io/gorm"
)

type InitService struct{}

func (*InitService) InitSystem(in *input.InitSystem) (out *output.InitSystem, err error) {
	out = &output.InitSystem{}

	err = global.DB.Transaction(func(tx *gorm.DB) error {
		user := &model.User{
			Passport:     in.Passport,
			Nickname:     in.Passport,
			Email:        in.Email,
			Password:     pkg.MD5Encrypt(in.Password),
			Avatar:       pkg.DefaultAvatar(),
			Signature:    pkg.DefaultSignature(),
			Introduction: pkg.DefaultIntroduction(),
			Resume:       pkg.DefaultResume(),
			Github:       "",
		}

		result := tx.Create(user)
		if result.Error != nil {
			return result.Error
		}

		// 使用创建的用户ID
		site := &model.Site{
			UserId:     user.Id,
			SiteName:   in.WebsiteName,
			SiteIcon:   "",
			SiteDomain: "",
		}

		result = tx.Create(site)
		if result.Error != nil {
			return result.Error
		}

		return nil
	})

	return
}
