package pkg

import (
	"phospherus/global/biz"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("phospherus")

// CreateToken 生成 Token
func CreateToken(passport string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"iss": passport,
		"exp": time.Now().Add(time.Hour * 3).Unix(),
	})

	tokenStr, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}
	return tokenStr, nil
}

// VerifyToken 校验 Token
func VerifyToken(tokenStr string) (jwt.Claims, error) {

	token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, biz.ErrJwtInvalid
	}

	return token.Claims, nil
}
