package pkg

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// 判断文件是否存在
func FileExists(filePath string) bool {
	_, err := os.Stat(filePath)
	if os.IsNotExist(err) {
		return false
	}
	return err == nil
}

// 给文件名添加时间戳
func AddTimeToFilename(filename string) string {
	ext := filepath.Ext(filename)
	nameWithoutExt := strings.TrimSuffix(filename, ext)
	return fmt.Sprintf("%s_%s%s", nameWithoutExt, GenTimestamp(), ext)
}

// 根据文件后缀名，判断文件类别，主要判读图片，视频和音频，其他
func GetFileType(ext string) int {
	ext = strings.ToLower(ext)
	switch ext {
	case ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".ico", ".webp":
		return 1
	case ".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv":
		return 2
	case ".mp3", ".wav", ".aac", ".flac", ".m4a", ".ogg":
		return 3
	default:
		return 4
	}
}
