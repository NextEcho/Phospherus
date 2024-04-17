package tools

import (
	"errors"
	"os"
)

// 判断路径为 path 的文件是否存在
func PathExists(path string) (bool, error) {
	file, err := os.Stat(path)
	if err == nil {
		if file.IsDir() {
			return true, nil
		}
		return false, errors.New("存在同名文件")
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}
