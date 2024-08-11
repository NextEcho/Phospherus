import http, { CustomSuccessData } from "@/tools/request";
import { deleteTagReq, deleteTagResp, getTagListReq, getTagListResp } from "./types";

enum API {
    TAG_LIST = "/tag/getTagList", // 标签列表接口
    DELETE_TAG = "/tag/deleteTag", // 标签列表接口
}

export const getTagListAPI = (data: getTagListReq): Promise<CustomSuccessData<getTagListResp>> => {
    return http.post<getTagListResp>(API.TAG_LIST, data);
};

export const deleteTagAPI = (data: deleteTagReq): Promise<CustomSuccessData<deleteTagResp>> => {
    return http.post<deleteTagResp>(API.DELETE_TAG, data);
};
