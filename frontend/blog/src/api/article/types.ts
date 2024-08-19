export interface articleItem {
    id: number;
    title: string;
    content: string;
    cover: string;
    tagIds: number[];
    tagNames: string[];
    description: string;
    isVisible: number;
    createdAt: string;
    updatedAt: string;
}

export interface archiveItem {
    year: string;
    articleList: articleItem[];
}

// getArticleDetail Request and Response
export interface getArticleDetailReq {
    id: number;
}

export interface getArticleDetailResp {
    id: number;
    authoId: number;
    categoryId: number;
    title: string;
    content: string;
    cover: string;
    description: string;
    isVisible: number;
    isAbout: number;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    authorName: string;
    categoryName: string;
    tagNames: string[];
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

// getArchiveList Request and Response
export interface getArchiveListReq {}

export interface getArchiveListResp {
    archiveList: archiveItem[];
}

// getArticleListByTag Request and Response
export interface getArticleListByTagReq {
    pageNum: number;
    pageSize: number;
    tagId: number;
}

export interface getArticleListByTagResp {
    pageNum: number;
    pageSize: number;
    total: number;
    articleList: archiveItem[];
}
