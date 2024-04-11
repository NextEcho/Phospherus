package config

var appConfig = new(AppConfig)

type AppConfig struct {
	*Server      `mapstructure:"server"`
	*MysqlConfig `mapstructure:"mysql"`
	*RedisConfig `mapstructure:"redis"`
}

type Server struct {
	Name string `mapstructure:"name"`
	Port string `mapstructure:"port"`
	Mode string `mapstructure:"mode"`
}

type MysqlConfig struct {
	Host         string `mapstructure:"host"`
	Dbname       string `mapstructure:"dbname"`
	User         string `mapstructure:"user"`
	Password     string `mapstructure:"password"`
	Port         int    `mapstructure:"port"`
	MaxOpenConns int    `mapstructure:"max_open_conns"`
	MaxIdleConns int    `mapstructure:"max_idle_conns"`
}

type RedisConfig struct {
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
}

func New() *AppConfig {
	return appConfig
}
