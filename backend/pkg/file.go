package pkg

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func FileExists(filePath string) bool {
	_, err := os.Stat(filePath)
	if os.IsNotExist(err) {
		return false
	}
	return err == nil
}

func AddTimeToFilename(filename string) string {
	ext := filepath.Ext(filename)
	nameWithoutExt := strings.TrimSuffix(filename, ext)
	return fmt.Sprintf("%s_%s%s", nameWithoutExt, GenTimestamp(), ext)
}
