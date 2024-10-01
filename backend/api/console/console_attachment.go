package console

import (
	"bytes"
	"io"
	"path/filepath"
	"phospherus/global"
	"phospherus/global/biz"
	"phospherus/model/common"
	"phospherus/model/console/input"
	"phospherus/model/console/request"
	"phospherus/model/console/response"
	"phospherus/pkg"
	"phospherus/pkg/oss"
	"phospherus/service/console"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type AttachmentApi struct{}

func (*AttachmentApi) UploadAttachment(ctx *gin.Context) {

	file, header, err := ctx.Request.FormFile("file")
	if err != nil {
		global.LOGGER.Error("ctx.Request.FormFile Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrFormFile.Error())
		return
	}
	defer file.Close()

	fileContent, err := io.ReadAll(file)
	if err != nil {
		global.LOGGER.Error("io.ReadAll(file) Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrIOReadAll.Error())
		return
	}

	objectName := pkg.AddTimeToFilename(header.Filename)
	url, err := oss.UploadFile(objectName, bytes.NewReader(fileContent))
	if err != nil {
		global.LOGGER.Error("oss.UploadAttachment Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrUploadAttachment.Error())
		return
	}

	var userId int
	userIdStr, exist := ctx.Get("id")
	if !exist {
		global.LOGGER.Error("ctx.Get Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrGetCtxValue.Error())
		return
	} else {
		userId, _ = strconv.Atoi(userIdStr.(string))
	}

	_, err = console.AttachmentServiceInstance.SaveAttachment(&input.SaveAttachment{
		CreatorId: userId,
		Url:       url,
		Name:      header.Filename,
		Ext:       filepath.Ext(header.Filename),
		Type:      1,
		Size:      len(fileContent),
	})
	if err != nil {
		global.LOGGER.Error("console.AttachmentServiceInstance.SaveAttachment Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrSaveAttachment.Error())
		return
	}

	resp := response.UploadAttachment{
		Url: url,
	}

	common.OkWithDetail(ctx, biz.MsgUploadAttachmentSuccess, resp)
}

func (*AttachmentApi) GetAttachment(ctx *gin.Context) {
	req := request.GetAttachment{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	out, err := console.AttachmentServiceInstance.GetAttachment(&input.GetAttachment{
		Id: req.Id,
	})
	if err != nil {
		global.LOGGER.Error("console.AttachmentServiceInstance.GetAttachment Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	resp := response.GetAttachment{
		Id:        out.Id,
		CreatorId: out.CreatorId,
		Creator:   out.Creator,
		Url:       out.Url,
		Name:      out.Name,
		Ext:       out.Ext,
		Type:      out.Type,
		Size:      out.Size,
		CreatedAt: out.CreatedAt,
	}
	common.OkWithDetail(ctx, biz.MsgGetAttachmentSuccess, resp)
}

func (*AttachmentApi) DeleteAttachment(ctx *gin.Context) {
	req := request.DeleteAttachment{}

	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		global.LOGGER.Error("ctx.ShouldBindJSON Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrBindJSON.Error())
		return
	}

	_, err = console.AttachmentServiceInstance.DeleteAttachment(&input.DeleteAttachment{
		Id: req.Id,
	})
	if err != nil {
		global.LOGGER.Error("console.AttachmentServiceInstance.DeleteAttachment Error", zap.Error(err))
		common.FailWithMessage(ctx, biz.ErrServerBusy.Error())
		return
	}

	common.OkWithMessage(ctx, biz.MsgDeleteAttachmentSuccess)
}
