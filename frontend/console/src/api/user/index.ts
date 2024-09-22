import http, { CustomSuccessData } from "@/tools/request";
import { getUserListReq, getUserListResp } from "./types";

enum API {
    USER_LIST = "/user/getUserList", // 标签列表接口
}

export const getUserListAPI = (data: getUserListReq): Promise<CustomSuccessData<getUserListResp>> => {
    return http.post<getUserListResp>(API.USER_LIST, data);
};
