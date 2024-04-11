package core

import (
	"phospherus/config"
	"phospherus/internal/router"

	"github.com/fvbock/endless"
)

// Run 初始化函数，用于加载所有的初始函数
func Run() {

	// 加载配置文件
	if err := loadFileConfig(); err != nil {
		panic(err.Error())
	}

	// 初始化 MySQL 数据库
	if err := loadMysql(); err != nil {
		panic(err.Error())
	}

	// 初始化 Redis 数据库
	if err := loadRedis(); err != nil {
		panic(err.Error())
	}

	// 启动服务
	if err := endless.ListenAndServe(config.New().Server.Port, router.New()); err != nil {
		panic(err.Error())
	}
}
