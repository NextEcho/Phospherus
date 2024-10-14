package model

import "time"

type Site struct {
	Id         int       `json:"id"`
	UserId     int       `json:"userId"`
	SiteName   string    `json:"siteName"`
	SiteIcon   string    `json:"siteIcon"`
	SiteDomain string    `json:"siteDomain"`
	CreatedAt  time.Time `json:"createdAt"`
}

func (*Site) TableName() string {
	return "site"
}
