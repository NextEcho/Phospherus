import http from "@/tools/request";
import {
  getArchiveListResp,
  getArticleDetailReq,
  getArticleDetailResp,
  getArticleListReq,
  getArticleListResp,
} from "./types";
import { CustomSuccessData } from "@/tools/request";

enum API {
  ARTICLE_DETAIL_URL = "/article/getArticleDetail", // 文章内容接口
  ARTICLE_LIST_URL = "/article/getArticleList", // 文章列表接口
  ARCHIVE_LIST_URL = "/article/getArchiveList", // 归档文章列表接口
}

export const getArticleDetailAPI = (
  data: getArticleDetailReq,
): Promise<CustomSuccessData<getArticleDetailResp>> => {
  return http.post<getArticleDetailResp>(API.ARTICLE_DETAIL_URL, data);
};

export const getArticleListAPI = (
  data: getArticleListReq,
): Promise<CustomSuccessData<getArticleListResp>> => {
  return http.post(API.ARTICLE_LIST_URL, data);
};

export const getArchiveListAPI = (): Promise<CustomSuccessData<getArchiveListResp>> => {
  return http.get(API.ARCHIVE_LIST_URL);
};
