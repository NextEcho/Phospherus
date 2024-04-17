package core

import (
	"phospherus/global"
	"phospherus/middleware"
	"phospherus/router"

	"github.com/fvbock/endless"
)

func RunServer() {
	Router := router.Router()

	Router.Use(middleware.ZapLogger(), middleware.Cors())

	if err := endless.ListenAndServe(global.APP_CONFIG.Server.Port, Router); err != nil {
		global.LOGGER.Error(err.Error())
		return
	}
}
