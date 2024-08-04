export interface tagItem {
  id: number;
  name: number;
  backgroundColor: string;
  isVisible: number;
}

// getArticleList Request and Response
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
