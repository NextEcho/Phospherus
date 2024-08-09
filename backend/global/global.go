package global

import (
	"phospherus/config"

	"github.com/aliyun/aliyun-oss-go-sdk/oss"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

// 全局变量
var (
	APP_CONFIG *config.AppConfig
	LOGGER     *zap.Logger
	DB         *gorm.DB
	OSS_CLIENT *oss.Client
)
