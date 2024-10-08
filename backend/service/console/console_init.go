package console

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/console/input"
	"phospherus/model/console/output"
	"phospherus/pkg"
)

type InitService struct{}

func (*InitService) InitSystem(in *input.InitSystem) (out *output.InitSystem, err error) {
	out = &output.InitSystem{}

	err = global.DB.Create(&model.User{
		Passport:     in.Passport,
		Nickname:     in.Passport,
		Password:     pkg.MD5Encrypt(in.Password),
		Avatar:       pkg.DefaultAvatar(),
		Signature:    pkg.DefaultSignature(),
		Introduction: pkg.DefaultIntroduction(),
		Resume:       pkg.DefaultResume(),
		Email:        "",
		Github:       "",
	}).Error
	if err != nil {
		return nil, err
	}

	return
}
