package tools

import (
	"crypto/md5"
	"fmt"
)

// Md5Encrypt
func MD5Encrypt(password string) (newPassword string) {
	hash := md5.Sum([]byte(password))
	newPassword = fmt.Sprintf("%x", hash)
	return
}
