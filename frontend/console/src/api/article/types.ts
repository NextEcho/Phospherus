export interface articleItem {
  id: number;
  categoryId: number;
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
  title: string;
  content: string;
  cover: string;
  authorId: number;
  categoryId: number;
  isVisible: number;
}

export interface postArticleResp {

}
