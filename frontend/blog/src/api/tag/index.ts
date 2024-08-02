import http, { CustomSuccessData } from "@/tools/request";
import { getTagListResp } from "./types";

enum API {
  TAG_LIST_URL = "/tag/getTagList", // 获取标签列表接口
}

export const getTagListAPI = (): Promise<CustomSuccessData<getTagListResp>> => {
  return http.get<getTagListResp>(API.TAG_LIST_URL);
};
