export interface articleItem {
  id: number;
  categoryId: number;
  tagIds: number[];
  title: string;
  cover: string;
  description: string;
  categoryName: string;
  tagNames: string[];
  latestUpdatedAt: string;
}

export interface miniArticleItem {
  dateTime: string;
  title: string;
}

export interface archiveItem {
  year: string;
  articleList: miniArticleItem[];
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
