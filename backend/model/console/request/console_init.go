package request

type InitSystem struct {
	WebsiteName     string `json:"websiteName" binding:"required"`
	Passport        string `json:"passport" binding:"required"`
	Password        string `json:"password" binding:"required"`
	ConfirmPassword string `json:"confirmPassword" binding:"required"`
}
