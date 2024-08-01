package core

import (
	"fmt"
	"os"
	"path/filepath"
	"phospherus/pkg"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

const logPath = "logs/server.log"

// Zap 初始化 zap 日志
func Zap() (logger *zap.Logger) {
	writeSyncer := getLogWriter()
	encoder := getEncoder()

	zapCore := zapcore.NewCore(encoder, writeSyncer, zapcore.DebugLevel)
	logger = zap.New(zapCore)

	return
}

func getEncoder() zapcore.Encoder {
	return zapcore.NewJSONEncoder(zap.NewProductionEncoderConfig())
}

func getLogWriter() zapcore.WriteSyncer {

	if !pkg.FileExists(logPath) {
		err := os.MkdirAll(filepath.Dir(logPath), 0755)
		if err != nil {
			panic(fmt.Errorf("create path error: %v", err.Error()))
		}
	}

	file, err := os.Create(logPath)
	if err != nil {
		panic(fmt.Errorf("os.Create Error: %v", err.Error()))
	}
	return zapcore.AddSync(file)
}
