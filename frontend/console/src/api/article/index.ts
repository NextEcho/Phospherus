import request from "@/tools/request";
import { GetArticleListReq, GetArticleListResp } from "./type";

enum API {
    GET_ARTICLE_DETAIL = "/article/getArticleDetail",
    GET_ARTICLE_LIST = "/article/getArticleList",
    POST_ARTICLE = "/article/postArticle",
    DELETE_ARTICLE = "/article/deleteArticle",
    UPDATE_ARTICLE = "/article/updateArticle",
}

// 获取文章列表的请求
export const reqGetArticleList = (
    getArticleListReq: GetArticleListReq,
): Promise<GetArticleListResp> => {
    return request.post<any, GetArticleListResp>(
        API.GET_ARTICLE_LIST,
        JSON.stringify(getArticleListReq),
    );
};
