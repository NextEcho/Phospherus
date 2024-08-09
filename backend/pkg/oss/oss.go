package oss

import (
	"fmt"
	"io"
	"phospherus/global"

	"github.com/aliyun/aliyun-oss-go-sdk/oss"
	"go.uber.org/zap"
)

var Bucket *oss.Bucket

func initBucket() {
	var err error
	Bucket, err = global.OSS_CLIENT.Bucket(global.APP_CONFIG.OssConfig.Bucket)
	if err != nil {
		global.LOGGER.Error("Bucket Error", zap.Error(err))
		return
	}
}

// 对象存储服务相关
func UploadFile(objectName string, localFile io.Reader) (string, error) {

	if Bucket == nil {
		initBucket()
	}
	err := Bucket.PutObject(objectName, localFile)
	if err != nil {
		global.LOGGER.Error("Bucket.PutObject Error", zap.Error(err))
		return "", err
	}

	return GetFileUrl(objectName), nil
}

// 获取上传的文件的 URL
func GetFileUrl(objectName string) string {
	return fmt.Sprintf("%s/%s/%s",
		global.APP_CONFIG.OssConfig.Endpoint,
		global.APP_CONFIG.OssConfig.Bucket,
		objectName,
	)
}
