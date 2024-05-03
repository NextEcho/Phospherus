package blog

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/blog/input"
	"phospherus/model/blog/output"

	"github.com/jinzhu/copier"
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

	copier.Copy(&out.UserItem, user)

	return
}
