import { CustomSuccessData } from "@/tools/request";
import { getArticleListReq, getArticleListResp, postArticleReq, postArticleResp } from "./types";
import http from "@/tools/request";

enum API {
  ARTICLE_LIST = "/article/getArticleList", // 文章列表接口
  POST_ARTICLE = "/article/postArticle", // 发布文章接口
}

export const getArticleListAPI = (
  data: getArticleListReq,
): Promise<CustomSuccessData<getArticleListResp>> => {
  return http.post<getArticleListResp>(API.ARTICLE_LIST, data);
};

export const postArticleAPI = (
  data: postArticleReq,
): Promise<CustomSuccessData<postArticleResp>> => {
  return http.post<postArticleResp>(API.POST_ARTICLE, data);
};
