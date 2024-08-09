package console

import (
	"bytes"
	"io"
	"phospherus/global"
	"phospherus/global/biz"
	commonresp "phospherus/model/common/response"
	"phospherus/model/console/response"
	"phospherus/pkg"
	"phospherus/pkg/oss"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type FileApi struct{}

func (*FileApi) Upload(ctx *gin.Context) {

	file, header, err := ctx.Request.FormFile("file")
	if err != nil {
		global.LOGGER.Error("ctx.Request.FormFile Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrFormFile.Error())
		return
	}
	defer file.Close()

	fileContent, err := io.ReadAll(file)
	if err != nil {
		global.LOGGER.Error("io.ReadAll(file) Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrIOReadAll.Error())
		return
	}

	objectName := pkg.AddTimeToFilename(header.Filename)
	url, err := oss.UploadFile(objectName, bytes.NewReader(fileContent))
	if err != nil {
		global.LOGGER.Error("oss.UploadFile Error", zap.Error(err))
		commonresp.FailWithMessage(ctx, biz.ErrUploadFile.Error())
		return
	}

	resp := response.FileUpload{
		Url: url,
	}

	commonresp.OkWithDetail(ctx, biz.MsgUploadFileSuccess, resp)
}
