package core

import (
	"log"
	"phospherus/config"

	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
)

// LoadFileConfig 加载配置文件
func loadFileConfig() (err error) {

	// 加载配置文件, 配置文件路径: etc/config.yml
	viper.SetConfigFile("etc/config.yml")
	if err = viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			log.Fatal("Error: Config File Not Found!")
		}
		return
	}

	// 读取到的配置信息，反序列化到 Conf 结构体中
	if err = viper.Unmarshal(config.New()); err != nil {
		log.Fatal("viper Unmarshal failed, err: ", err)
		return
	}

	// viper 热加载配置
	viper.WatchConfig()
	viper.OnConfigChange(func(event fsnotify.Event) {
		log.Println("Config File Changed: ", event.Name)
		if err := viper.Unmarshal(config.New()); err != nil {
			log.Println("viper Unmarshal failed, err:", err)
			return
		}
	})

	return
}
