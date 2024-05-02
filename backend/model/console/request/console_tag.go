package request

import commonreq "phospherus/model/common/request"

type GetTagList struct {
	commonreq.PageRequest
}

type CreateTag struct {
	Name      string `json:"name"`
	IsVisible int    `json:"is_visible"`
}

type DeleteTag struct {
	Ids []int `json:"ids"`
}

type UpdateTag struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	IsVisible int    `json:"is_visible"`
}
