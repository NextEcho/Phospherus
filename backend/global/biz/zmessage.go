package biz

// Auth Module
const (
	MsgValidateTokenSuccess    = "验证Token成功"
	MsgTokenInvalid            = "无效的Token"
	MsgLoginSuccess            = "登录成功"
	MsgAccountMismatchPassword = "登陆失败, 账户名或者密码错误"
	MsgConfirmPasswordNotMatch = "确认密码不匹配"
)

// Init Module
const (
	MsgWebsiteNameEmpty  = "网站名称不能为空"
	MsgInitSystemSuccess = "初始化系统成功"
)

// User Module
const (
	MsgGetUserInfoSuccess    = "获取用户信息成功"
	MsgGetUserListSuccess    = "获取用户列表成功"
	MsgDeleteUserSuccess     = "删除用户成功"
	MsgCreateUserSuccess     = "创建用户成功"
	MsgUpdateUserSuccess     = "更新用户成功"
	MsgCreateInitUserSuccess = "创建初始用户成功"
)

// Attachment Module
const (
	MsgUploadAttachmentSuccess  = "上传附件成功"
	MsgGetAttachmentSuccess     = "获取附件成功"
	MsgDeleteAttachmentSuccess  = "删除附件成功"
	MsgGetAttachmentListSuccess = "获取附件列表成功"
)

// Article Module
const (
	MsgGetArticleDetailSuccess = "获取文章详情成功"
	MsgGetArticleListSuccess   = "获取文章列表成功"
	MsgDeleteArticleSuccess    = "删除文章成功"
	MsgPostArticleSuccess      = "发布文章成功"
	MsgUpdateArticleSuccess    = "修改文章成功"
)

// Tag Module
const (
	MsgGetTagListSuccess = "获取标签列表成功"
	MsgCreateTagSuccess  = "创建标签成功"
	MsgDeleteTagSuccess  = "删除标签成功"
	MsgUpdateTagSuccess  = "修改标签成功"
)

// Category Module
const (
	MsgGetCategoryListSuccess = "获取分类列表成功"
	MsgCreateCategorySuccess  = "创建分类成功"
	MsgDeleteCategorySuccess  = "删除分类成功"
	MsgUpdateCategorySuccess  = "修改分类成功"
)
