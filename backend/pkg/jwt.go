package pkg

import (
	"phospherus/global"
	"phospherus/global/biz"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type MyClaims struct {
	Id       string `json:"id"`
	Passport string `json:"passport"`
	jwt.RegisteredClaims
}

// CreateToken 生成 Token
func CreateToken(id string, passport string) (string, error) {
	myClaims := MyClaims{
		Id:       id,
		Passport: passport,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(6 * time.Hour)), //有效时间
			IssuedAt:  jwt.NewNumericDate(time.Now()),                    //签发时间
			NotBefore: jwt.NewNumericDate(time.Now()),                    //生效时间
			Issuer:    passport,                                          //签发人
			Subject:   "phosphorus",                                      //主题
			ID:        id,                                                //JWT ID用于标识该JWT
			Audience:  []string{passport},                                //用户
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, myClaims)

	tokenStr, err := token.SignedString([]byte(global.APP_CONFIG.JwtConfig.Secret))
	if err != nil {
		return "", err
	}
	return tokenStr, nil
}

// VerifyToken 校验 Token
func VerifyToken(tokenStr string) (*MyClaims, error) {

	token, err := jwt.ParseWithClaims(tokenStr, &MyClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(global.APP_CONFIG.JwtConfig.Secret), nil
	})
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*MyClaims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, biz.ErrJwtInvalid
	}
}
