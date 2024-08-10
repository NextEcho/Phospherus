export interface articleItem {
  id: number;
  tagIds: number[];
  title: string;
  cover: string;
  description: string;
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

export interface postArticleResp {}
