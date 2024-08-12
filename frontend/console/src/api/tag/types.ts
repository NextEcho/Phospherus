export interface tagItem {
    id: number;
    name: string;
    backgroundColor: string;
    articleCount: number;
    value?: number;
    label?: string;
}

// getTagList Request and Response
export interface getTagListReq {
    pageNum: number;
    pageSize: number;
}

export interface getTagListResp {
    pageNum: number;
    pageSize: number;
    total: number;
    tagList: tagItem[];
}

// deleteTag Request and Response
export interface deleteTagReq {
    ids: number[];
}

export interface deleteTagResp {
    pageNum: number;
    pageSize: number;
    total: number;
    tagList: tagItem[];
}

// createTag Request And Response
export interface createTagReq {
    name: string;
    backgroundColor: string;
}

export interface createTagResp {}
