import http, { CustomSuccessData } from "@/tools/request";
import { getUserInfoReq, getUserInfoResp } from "./types";

enum API {
    USER_INFO_URL = "/user/getUserInfo", // 获取博主信息接口
}

export const getUserInfoAPI = (data: getUserInfoReq): Promise<CustomSuccessData<getUserInfoResp>> => {
    return http.post<getUserInfoResp>(API.USER_INFO_URL, data);
};
