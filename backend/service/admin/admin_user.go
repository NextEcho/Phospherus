package admin

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/admin/response"
	"phospherus/pkg"
)

type UserService struct{}

// Login 管理员登录
func (*UserService) Login(in *model.User) (resp *response.Login, err error) {
	resp = &response.Login{}

	var user model.User
	err = global.DB.Where("passport = ?", in.Passport).First(&user).Error
	if err == nil {
		if in.Password != pkg.MD5Encrypt(user.Password) {
			return nil, pkg.ErrPasswordMismatch
		}
		resp.Id = user.Id
		resp.Token = "token" // TODO: 生成 Token
	}
	return
}
