package console

import (
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model"
	"phospherus/model/console/input"
	"phospherus/model/console/output"
	"phospherus/pkg"
)

type UserService struct{}

// Login 管理员登录
func (*UserService) Login(in *input.Login) (resp *output.Login, err error) {
	resp = &output.Login{}

	var user model.User
	err = global.DB.Where("passport = ?", in.Passport).First(&user).Error
	if err == nil {
		if user.Password != pkg.MD5Encrypt(in.Password) {
			return nil, biz.ErrPasswordMismatch
		}
		resp.Id = user.Id
		resp.Token, err = pkg.CreateToken(in.Passport)
		if err != nil {
			return nil, biz.ErrCreateJwt
		}
	}
	return
}
