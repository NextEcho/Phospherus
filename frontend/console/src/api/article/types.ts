export interface ResponseData {
    code: number;
    message: string;
}

export interface ArticleItem {
    id: number;
    title: string;
    content: string;
    cover: string;
    description: string;
    isVisible: number;
    tagList: number[];
    authorId: number;
}

// 获取文章列表请求
export interface GetArticleListReq {
    page_num: number;
    page_size: number;
}

// 获取文章列表响应
export interface GetArticleListResp extends ResponseData {
    data: {
        page_num: number;
        page_size: number;
        total: number;
        article_list: ArticleItem[];
    };
}
