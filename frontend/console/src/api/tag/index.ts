import http, { CustomSuccessData } from "@/tools/request";
import {
    createTagReq,
    createTagResp,
    deleteTagReq,
    deleteTagResp,
    getTagListReq,
    getTagListResp,
    updateTagReq,
    updateTagResp,
} from "./types";

enum API {
    TAG_LIST = "/tag/getTagList", // 标签列表接口
    DELETE_TAG = "/tag/deleteTag", // 删除标签接口
    CREATE_TAG = "/tag/createTag", // 创建标签列表接口
    UPDATE_TAG = "/tag/updateTag" // 修改标签信息
}

export const getTagListAPI = (data: getTagListReq): Promise<CustomSuccessData<getTagListResp>> => {
    return http.post<getTagListResp>(API.TAG_LIST, data);
};

export const deleteTagAPI = (data: deleteTagReq): Promise<CustomSuccessData<deleteTagResp>> => {
    return http.post<deleteTagResp>(API.DELETE_TAG, data);
};

export const createTagAPI = (data: createTagReq): Promise<CustomSuccessData<createTagResp>> => {
    return http.post<createTagResp>(API.CREATE_TAG, data);
};

export const updateTagAPI = (data: updateTagReq): Promise<CustomSuccessData<updateTagResp>> => {
    return http.post<updateTagResp>(API.UPDATE_TAG, data);
};
