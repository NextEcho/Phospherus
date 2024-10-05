import http, { CustomSuccessData } from "@/tools/request";
import {
    createUserReq,
    createUserResp,
    deleteUserReq,
    deleteUserResp,
    getUserInfoReq,
    getUserInfoResp,
    getUserListReq,
    getUserListResp,
    updateUserReq,
    updateUserResp,
} from "./types";

enum API {
    GET_USER_INFO = "/user/getUserInfo", // 用户信息接口
    USER_LIST = "/user/getUserList", // 用户列表接口
    CREATE_USER = "/user/createUser", // 创建用户接口
    DELETE_USER = "/user/deleteUser", // 删除用户接口
    UPDATE_USER = "/user/updateUser", // 修改用户接口
}

export const getUserInfoAPI = (data: getUserInfoReq) : Promise<CustomSuccessData<getUserInfoResp>> => {
    return http.post<getUserInfoResp>(API.GET_USER_INFO, data);
}

export const getUserListAPI = (
    data: getUserListReq,
): Promise<CustomSuccessData<getUserListResp>> => {
    return http.post<getUserListResp>(API.USER_LIST, data);
};

export const createUserAPI = (
    data: createUserReq,
): Promise<CustomSuccessData<createUserResp>> => {
    return http.post<createUserResp>(API.CREATE_USER, data);
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
