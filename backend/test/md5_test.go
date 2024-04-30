package test

import (
	"phospherus/pkg"
	"testing"
)

func TestMd5(t *testing.T) {
	password := "123456"
	new := pkg.MD5Encrypt(password)
	t.Log(new)
}
