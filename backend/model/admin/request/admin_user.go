package request

type Login struct {
	Passport string `json:"passport"`
	Password string `json:"password"`
}
