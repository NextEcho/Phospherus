package blog

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/blog/input"
	"phospherus/model/blog/output"
)

type UserService struct{}

// GetUserInfo 获取博主信息
func (*UserService) GetUserInfo(in *input.GetUserInfo) (out *output.GetUserInfo, err error) {
	out = &output.GetUserInfo{}

	user := model.User{}
	err = global.DB.Table("user").Where("id = ?", in.Id).First(&user).Error
	if err != nil {
		return
	}

	out.Id = user.Id
	out.Passport = user.Passport
	out.Nickname = user.Nickname
	out.Avatar = user.Avatar
	out.Signature = user.Signature
	out.Email = user.Email
	out.Github = user.Github
	out.Introduction = user.Introduction
	out.Resume = user.Resume

	return
}
