package config

type OssConfig struct {
	AccessKey string `mapstructure:"accessKey" json:"accessKey"`
	SecretKey string `mapstructure:"secretKey" json:"secretKey"`
	Endpoint  string `mapstructure:"endpoint" json:"endpoint"`
	Bucket    string `mapstructure:"bucket" json:"bucket"`
}
