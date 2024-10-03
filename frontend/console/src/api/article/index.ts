import { CustomSuccessData } from "@/tools/request";
import {
    deleteArticleReq,
    deleteArticleResp,
    getArticleDetailReq,
    getArticleDetailResp,
    getArticleListReq,
    getArticleListResp,
    postArticleReq,
    postArticleResp,
    updateArticleReq,
    updateArticleResp,
} from "./types";
import http from "@/tools/request";

enum API {
    ARTICLE_LIST = "/article/getArticleList", // 文章列表接口
    POST_ARTICLE = "/article/postArticle", // 发布文章接口
    DELETE_ARTICLE = "/article/deleteArticle", // 删除文章接口
    GET_ARTICLE_DETAIL = "/article/getArticleDetail", // 获取文章详情接口
    UPDATE_ARTICLE = "/article/updateArticle", // 更新文章接口
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

export const getArticleDetailAPI = (
    data: getArticleDetailReq,
): Promise<CustomSuccessData<getArticleDetailResp>> => {
    return http.post<getArticleDetailResp>(API.GET_ARTICLE_DETAIL, data);
};

export const updateArticleAPI = (
    data: updateArticleReq,
): Promise<CustomSuccessData<updateArticleResp>> => {
    return http.post<updateArticleResp>(API.UPDATE_ARTICLE, data);
};
