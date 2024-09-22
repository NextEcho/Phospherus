package console

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model"
	"phospherus/model/common"
	"phospherus/model/console/input"
	"phospherus/model/console/output"
	"phospherus/pkg"
)

type UserService struct{}

// Login 管理员登录
func (*UserService) Login(in *input.Login) (out *output.Login, err error) {
	out = &output.Login{}

	var user model.User
	err = global.DB.Where("passport = ?", in.Passport).First(&user).Error
	if err == nil {
		if user.Password != pkg.MD5Encrypt(in.Password) {
			return nil, biz.ErrPasswordMismatch
		}
		out.Id = user.Id
		out.Token, err = pkg.CreateToken(in.Passport)
		if err != nil {
			return nil, biz.ErrCreateJwt
		}
	}
	return
}

func (*UserService) GetUserList(in *input.GetUserList) (out *output.GetUserList, err error) {
	out = &output.GetUserList{
		PageResponse: common.PageResponse{
			PageNum:  in.PageNum,
			PageSize: in.PageSize,
		},
	}

	// 查询标签总数
	err = global.DB.Table("user").Count(&out.Total).Error
	if err != nil {
		return
	}

	var users []model.User
	err = global.DB.Limit(in.PageSize).Offset((in.PageNum - 1) * in.PageSize).Find(&users).Error
	if err != nil {
		return nil, err
	}

	out.UserList = make([]output.UserItem, len(users))

	for i, user := range users {
		out.UserList[i].Id = user.Id
		out.UserList[i].Passport = user.Passport
		out.UserList[i].Nickname = user.Nickname
		out.UserList[i].Avatar = user.Avatar
		out.UserList[i].Email = user.Email
		out.UserList[i].Github = user.Github
	}

	return out, nil
}
