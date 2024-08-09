package test

import (
	"fmt"
	"phospherus/pkg"
	"testing"
)

func TestFileExt(t *testing.T) {
	filename := pkg.AddTimeToFilename("test.txt")
	fmt.Println("filename is", filename)
}
