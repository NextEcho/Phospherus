import { CustomSuccessData } from "@/tools/request";
import {
    deleteArticleReq,
    deleteArticleResp,
    getArticleListReq,
    getArticleListResp,
    postArticleReq,
    postArticleResp,
} from "./types";
import http from "@/tools/request";

enum API {
    ARTICLE_LIST = "/article/getArticleList", // 文章列表接口
    POST_ARTICLE = "/article/postArticle", // 发布文章接口
    DELETE_ARTICLE = "/article/deleteArticle", // 删除文章接口
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

export const deleteArticleAPI = (
    data: deleteArticleReq,
): Promise<CustomSuccessData<deleteArticleResp>> => {
    return http.post<deleteArticleResp>(API.DELETE_ARTICLE, data);
};
