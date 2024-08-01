package pkg

import "time"

var TimeFormat = "2006-01-02 15:04:05"

func Time2String(t time.Time) string {
	return t.Format(time.RFC1123)
}
