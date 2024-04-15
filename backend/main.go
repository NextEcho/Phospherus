package main

import (
	"phospherus/config"
	"phospherus/core"
	"phospherus/router"

	"github.com/fvbock/endless"
)

func main() {

	// 加载配置文件
	core.Viper()

	// 加载日志库
	core.Zap()

	// 初始化 MySQL 数据库
	// if err := loadMysql(); err != nil {
	// 	panic(err.Error())
	// }

	// 初始化 Redis 数据库
	// if err := loadRedis(); err != nil {
	// 	panic(err.Error())
	// }

	// 启动服务
	if err := endless.ListenAndServe(config.New().Server.Port, router.New()); err != nil {
		panic(err.Error())
	}
}
