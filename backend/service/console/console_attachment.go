package console

import (
	"phospherus/global"
	model "phospherus/model/console"
	"phospherus/model/console/input"
	"phospherus/model/console/output"
)

type AttachmentService struct {
}

func (attachment *AttachmentService) SaveAttachment(in *input.SaveAttachment) (out *output.SaveAttachment, err error) {
	out = &output.SaveAttachment{}

	attachmentModel := model.Attachment{
		Url:  in.Url,
		Name: in.Name,
		Ext:  in.Ext,
		Type: in.Type,
		Size: in.Size,
	}
	err = global.DB.Create(&attachmentModel).Error
	if err != nil {
		return nil, err
	}

	return out, nil
}

func (attachment *AttachmentService) GetAttachment(in *input.GetAttachment) (*output.GetAttachment, error) {
	attachmentModel := model.Attachment{
		ID: in.ID,
	}

	err := global.DB.First(&attachmentModel).Error
	if err != nil {
		return nil, err
	}

	return &output.GetAttachment{
		Id:   attachmentModel.ID,
		Url:  attachmentModel.Url,
		Name: attachmentModel.Name,
		Ext:  attachmentModel.Ext,
		Type: attachmentModel.Type,
		Size: attachmentModel.Size,
	}, nil
}

func (attachment *AttachmentService) DeleteAttachment(in *input.DeleteAttachment) (*output.DeleteAttachment, error) {
	attachmentModel := model.Attachment{
		ID: in.ID,
	}

	err := global.DB.Delete(&attachmentModel).Error
	if err != nil {
		return nil, err
	}

	return &output.DeleteAttachment{}, nil
}
