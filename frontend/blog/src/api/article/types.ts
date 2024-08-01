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
