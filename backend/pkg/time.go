package pkg

import "time"

func Time2String(t time.Time, format string) string {
	return t.Format(format)
}

func GenTimestamp() string {
	return time.Now().Format("20060102_150405")
}
