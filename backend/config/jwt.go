package config

type JwtConfig struct {
	SecretKey  string `mapstructure:"secretKey"`
	ExpireTime int    `mapstructure:"expireTime"`
}
