import http, { CustomSuccessData } from "@/tools/request";
import {
    deleteUserReq,
    deleteUserResp,
    getUserListReq,
    getUserListResp,
    updateUserReq,
    updateUserResp,
} from "./types";

enum API {
    USER_LIST = "/user/getUserList", // 标签列表接口
    DELETE_USER = "/user/deleteUser", // 删除用户接口
    UPDATE_USER = "/user/updateUser", // 修改用户接口
}

export const getUserListAPI = (
    data: getUserListReq,
): Promise<CustomSuccessData<getUserListResp>> => {
    return http.post<getUserListResp>(API.USER_LIST, data);
};

export const deleteUserAPI = (
    data: deleteUserReq,
): Promise<CustomSuccessData<deleteUserResp>> => {
    return http.post<deleteUserResp>(API.DELETE_USER, data);
};

export const updateUserAPI = (
    data: updateUserReq,
): Promise<CustomSuccessData<updateUserResp>> => {
    return http.post<updateUserResp>(API.UPDATE_USER, data);
};
