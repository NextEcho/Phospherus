export interface tagItem {
    id: number;
    name: string;
    value: string;
    label: string;
    backgroundColor: string;
    articleCount: number;
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
