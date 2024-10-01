package console

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/console/input"
	"phospherus/model/console/output"

	"gorm.io/gorm"
)

type AttachmentService struct {
}

func (attachment *AttachmentService) SaveAttachment(in *input.SaveAttachment) (out *output.SaveAttachment, err error) {
	out = &output.SaveAttachment{}

	attachmentModel := model.Attachment{
		CreatorId: in.CreatorId,
		Url:       in.Url,
		Name:      in.Name,
		Ext:       in.Ext,
		Type:      in.Type,
		Size:      in.Size,
	}
	if err = global.DB.Create(&attachmentModel).Error; err != nil {
		return out, err
	}

	return out, nil
}

func (attachment *AttachmentService) GetAttachment(in *input.GetAttachment) (*output.GetAttachment, error) {
	attachmentModel := model.Attachment{
		Id: in.Id,
	}
	creator := model.User{}

	err := global.DB.Transaction(func(tx *gorm.DB) error {
		// 查询附件信息
		if err := tx.First(&attachmentModel).Error; err != nil {
			return err
		}

		// 查询附件的创建者信息
		if err := tx.Where("id = ?", attachmentModel.CreatorId).First(&creator).Error; err != nil {
			return err
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return &output.GetAttachment{
		Id:        attachmentModel.Id,
		CreatorId: creator.Id,
		Creator:   creator.Nickname,
		Url:       attachmentModel.Url,
		Name:      attachmentModel.Name,
		Ext:       attachmentModel.Ext,
		Type:      attachmentModel.Type,
		Size:      attachmentModel.Size,
		CreatedAt: attachmentModel.CreatedAt.Format("2006-01-02 15:04:05"),
	}, nil
}

func (attachment *AttachmentService) DeleteAttachment(in *input.DeleteAttachment) (*output.DeleteAttachment, error) {
	attachmentModel := model.Attachment{
		Id: in.Id,
	}

	err := global.DB.Delete(&attachmentModel).Error
	if err != nil {
		return nil, err
	}

	return &output.DeleteAttachment{}, nil
}
