import http from "@/tools/request";

const api = {
  get_article_detail: "/article/getArticleDetail", // 文章内容接口
  get_article_list: "/article/getArticleList", // 文章列表接口
};

export function getArticleDetailAPI(data: {}) {
  // return http.post<{ token: string }>(api.get_article_detail, data);
  return http.post(api.get_article_detail, data);
}
