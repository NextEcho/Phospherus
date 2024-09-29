package main

import (
	"phospherus/core"
	"phospherus/global"
	"phospherus/initialize"
)

func main() {
	// 加载配置文件
	initialize.Viper()

	// 加载日志库
	global.LOGGER = initialize.Zap()

	// 初始化 MySQL 数据库
	global.DB = initialize.Gorm()

	// 加载 OSS 对象存储服务
	global.OSS_CLIENT = initialize.Oss()

	// 启动服务
	core.RunServer()
}
