package test

import (
	"phospherus/pkg"
	"testing"
)

func TestCreateJwt(t *testing.T) {
	token, err := pkg.CreateToken("1", "admin")
	if err != nil {
		t.Error(err)
	}
	t.Log(token)
}

func TestParseJwt(t *testing.T) {
	token, _ := pkg.CreateToken("1", "admin")
	claims, err := pkg.VerifyToken(token)
	if err != nil {
		t.Error(err)
	}
	t.Log(claims)
}
