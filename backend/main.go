package main

import (
	"phospherus/core"
	"phospherus/global"
	"phospherus/initialize"
)

func main() {
	// 加载配置文件
	core.Viper()

	// 加载日志库
	global.LOGGER = core.Zap()

	// 初始化 MySQL 数据库
	global.DB = initialize.Gorm()

	// 初始化 Redis 数据库

	// 启动服务
	core.RunServer()
}
