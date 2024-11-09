package initialize

import (
	"fmt"
	"phospherus/global"
	"phospherus/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Gorm() *gorm.DB {
	if global.APP_CONFIG.MysqlConfig.User == "" {
		return nil
	}

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/?charset=utf8mb4&parseTime=True&loc=Local",
		global.APP_CONFIG.MysqlConfig.User,
		global.APP_CONFIG.MysqlConfig.Password,
		global.APP_CONFIG.MysqlConfig.Host,
		global.APP_CONFIG.MysqlConfig.Port,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to MySQL server: " + err.Error())
	}

	result := db.Raw(fmt.Sprintf("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '%s'",
		global.APP_CONFIG.MysqlConfig.Dbname)).Find(&struct{}{})
	if result.Error != nil {
		panic("Failed to check database existence: " + result.Error.Error())
	}

	if result.RowsAffected == 0 {
		if err := db.Exec("CREATE DATABASE " + global.APP_CONFIG.MysqlConfig.Dbname).Error; err != nil {
			panic("Failed to create database: " + err.Error())
		}
	}

	dsn = fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		global.APP_CONFIG.MysqlConfig.User,
		global.APP_CONFIG.MysqlConfig.Password,
		global.APP_CONFIG.MysqlConfig.Host,
		global.APP_CONFIG.MysqlConfig.Port,
		global.APP_CONFIG.MysqlConfig.Dbname,
	)

	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(global.APP_CONFIG.MysqlConfig.MaxIdleConns)
	sqlDB.SetMaxOpenConns(global.APP_CONFIG.MysqlConfig.MaxOpenConns)

	err = db.AutoMigrate(
		&model.ArticleTag{},
		&model.Article{},
		&model.Attachment{},
		&model.FriendLink{},
		&model.Site{},
		&model.Tag{},
		&model.User{},
	)
	if err != nil {
		panic("Failed to migrate database tables: " + err.Error())
	}

	return db
}
