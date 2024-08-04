import http, { CustomSuccessData } from "@/tools/request";
import { getTagListReq, getTagListResp } from "./type";

enum API {
  TAG_LIST = "/tag/getTagList", // 标签列表接口
}

export const getTagListAPI = (
  data: getTagListReq,
): Promise<CustomSuccessData<getTagListResp>> => {
  return http.post<getTagListResp>(API.TAG_LIST, data);
};
