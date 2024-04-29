package pkg

// GenDescription 根据文章内容生成文章描述
// 后期可更换为调用 AI 接口，自动生成描述
func GenDescription(content string) string {
	if len(content) > 120 {
		return content[:120]
	}
	return content
}
