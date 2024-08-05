package config

type Oss struct {
	*Aliyun `mapstructure:"aliyun"`
}

type Aliyun struct {
	SecretKey string `mapstructure:"secretKey" json:"secretKey"`
	AccessKey string `mapstructure:"accessKey" json:"accessKey"`
	Bucket    string `mapstructure:"bucket" json:"bucket"`
}
