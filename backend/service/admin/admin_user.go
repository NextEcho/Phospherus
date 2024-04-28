package admin

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model"
	"phospherus/model/admin/input"
	"phospherus/model/admin/output"
	"phospherus/pkg"
)

type UserService struct{}

// Login 管理员登录
func (*UserService) Login(in *input.Login) (resp *output.Login, err error) {
	resp = &output.Login{}

	var user model.User
	err = global.DB.Where("passport = ?", in.Passport).First(&user).Error
	if err == nil {
		if in.Password != pkg.MD5Encrypt(user.Password) {
			return nil, biz.ErrPasswordMismatch
		}
		resp.Id = user.Id
		resp.Token = "token" // TODO: 生成 Token
	}
	return
}
