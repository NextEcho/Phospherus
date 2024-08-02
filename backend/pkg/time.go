package pkg

import "time"

func Time2String(t time.Time, format string) string {
	return t.Format(format)
}
