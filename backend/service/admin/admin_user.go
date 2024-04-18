package admin

import (
	"errors"
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/admin/response"
	"phospherus/tools"
)

type UserService struct{}

// Login 管理员登录
func (*UserService) Login(in *model.User) (resp *response.Login, err error) {
	resp = &response.Login{}

	var user model.User
	err = global.DB.Where("passport = ?", in.Passport).First(&user).Error
	if err == nil {
		if in.Password != tools.MD5Encrypt(user.Password) {
			return nil, errors.New("密码错误")
		}
		resp.Id = user.Id
		resp.Token = "token" // TODO: 生成 Token
	}
	return
}
