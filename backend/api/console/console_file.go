package console

import (
	"github.com/gin-gonic/gin"
)

type FileApi struct{}

func (*FileApi) Upload(ctx *gin.Context) {

	file, err := ctx.FormFile("file")
	if err != nil {
		return
	}

	dst := ""

	if err = ctx.SaveUploadedFile(file, dst); err != nil {
		return
	}
}
