package core

import (
	"phospherus/global"
	"phospherus/router"

	"github.com/fvbock/endless"
)

func RunServer() {
	Router := router.Router()

	if err := endless.ListenAndServe(global.APP_CONFIG.Server.Port, Router); err != nil {
		global.LOGGER.Error(err.Error())
		return
	}
}
