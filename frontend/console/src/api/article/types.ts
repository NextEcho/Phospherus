export interface articleItem {
    id: number;
    title: string;
    cover: string;
    content: string;
    description: string;
    categoryName: string;
    tagIds: number[];
    tagNames: string[];
    createdAt: string;
    updatedAt: string;
}

// getArticleList Request and Response
export interface getArticleListReq {
    pageNum: number;
    pageSize: number;
}

export interface getArticleListResp {
    pageNum: number;
    pageSize: number;
    total: number;
    articleList: articleItem[];
}

// postArticle Request And Response
export interface postArticleReq {
    authorId: number;
    title: string;
    content: string;
    cover: string;
    description: string;
    isVisible: number;
    tagIds: number[];
    status: number;
}

export interface postArticleResp {
    id: number;
}

// deleteArticle Request And Response
export interface deleteArticleReq {
    ids: number[];
}

export interface deleteArticleResp {}

// getArticleDetail Request And Response
export interface getArticleDetailReq {
    id: number;
}

export interface getArticleDetailResp {
    id: number;
    title: string;
    content: string;
    cover: string;
    description: string;
    isVisible: number;
    tagIds: number[];
    status: number;
}

// updateArticle Request And Response
export interface updateArticleReq {
    id: number;
    title: string;
    cover: string;
    content: string;
    description: string;
    isVisible: number;
    tagIds: number[];
    status: number;
}

export interface updateArticleResp {
    id: number;
}
