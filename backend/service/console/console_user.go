package console

import (
	"errors"
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model"
	"phospherus/model/common"
	"phospherus/model/console/input"
	"phospherus/model/console/output"
	"phospherus/pkg"
	"strconv"

	"gorm.io/gorm"
)

type UserService struct{}

func (*UserService) Login(in *input.Login) (out *output.Login, err error) {
	out = &output.Login{}

	var user model.User
	err = global.DB.Where("passport = ?", in.Passport).First(&user).Error
	if err == nil {
		if user.Password != pkg.MD5Encrypt(in.Password) {
			return nil, biz.ErrPasswordMismatch
		}
		out.Id = user.Id
		out.Token, err = pkg.CreateToken(strconv.Itoa(user.Id), in.Passport)
		if err != nil {
			return nil, biz.ErrCreateJwt
		}
	}
	return
}

func (*UserService) CreateUser(in *input.CreateUser) (out *output.CreateUser, err error) {
	out = &output.CreateUser{}

	if in.Avatar == "" {
		in.Avatar = pkg.DefaultAvatar()
	}

	if in.Signature == "" {
		in.Signature = pkg.DefaultSignature()
	}

	if in.Introduction == "" {
		in.Introduction = pkg.DefaultIntroduction()
	}

	if in.Resume == "" {
		in.Resume = pkg.DefaultResume()
	}

	err = global.DB.Create(&model.User{
		Passport:     in.Passport,
		Password:     pkg.MD5Encrypt(in.Password),
		Nickname:     in.Nickname,
		Avatar:       in.Avatar,
		Signature:    in.Signature,
		Email:        in.Email,
		Github:       in.Github,
		Introduction: in.Introduction,
		Resume:       in.Resume,
	}).Error
	if err != nil {
		return nil, err
	}

	return out, nil
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

func (*UserService) GetUserInfo(in *input.GetUserInfo) (out *output.GetUserInfo, err error) {
	out = &output.GetUserInfo{}

	var user model.User
	err = global.DB.Where("id = ?", in.Id).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
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

	return out, nil
}

func (*UserService) DeleteUser(in *input.DeleteUser) (out *output.DeleteUser, err error) {
	out = &output.DeleteUser{}

	err = global.DB.Where("id = ?", in.Id).Delete(&model.User{}).Error
	if err != nil {
		return nil, err
	}

	return out, nil
}

func (*UserService) UpdateUser(in *input.UpdateUser) (out *output.UpdateUser, err error) {
	out = &output.UpdateUser{}

	err = global.DB.Model(&model.User{}).Where("id = ?", in.Id).Updates(model.User{
		Nickname: in.Nickname,
		Email:    in.Email,
		Github:   in.Github,
	}).Error
	if err != nil {
		return nil, err
	}

	return out, nil
}

func (*UserService) UpdateAvatar(in *input.UpdateAvatar) (out *output.UpdateAvatar, err error) {
	out = &output.UpdateAvatar{}

	err = global.DB.Model(&model.User{}).Where("id = ?", in.Id).Updates(model.User{
		Avatar: in.Avatar,
	}).Error
	if err != nil {
		return nil, err
	}

	return out, nil
}
