package initialize

import (
	"phospherus/global"

	"github.com/aliyun/aliyun-oss-go-sdk/oss"
	"go.uber.org/zap"
)

func Oss() *oss.Client {
	client, err := oss.New(
		global.APP_CONFIG.Endpoint,
		global.APP_CONFIG.AccessKey,
		global.APP_CONFIG.SecretKey,
	)

	if err != nil {
		global.LOGGER.Error("oss init error", zap.Error(err))
		return nil
	}
	return client
}
