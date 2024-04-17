package core

import (
	"go.uber.org/zap"
)

// Zap 初始化 zap 日志库
func Zap() (logger *zap.Logger) {
	// 判断是否有Director文件夹
	// if ok, _ := tools.PathExists(global.GVA_CONFIG.Zap.Director); !ok {
	// 	fmt.Printf("create %v directory\n", global.GVA_CONFIG.Zap.Director)
	// 	_ = os.Mkdir(global.GVA_CONFIG.Zap.Director, os.ModePerm)
	// }
	//
	// cores := internal.Zap.GetZapCores()
	// logger = zap.New(zapcore.NewTee(cores...))
	//
	// if global.GVA_CONFIG.Zap.ShowLine {
	// 	logger = logger.WithOptions(zap.AddCaller())
	// }
	return nil
}
