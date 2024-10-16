import http from "@/tools/request";
import { CustomSuccessData } from "@/tools/request";
import { loginReq, loginResp } from "./types";

enum API {
    LOGIN_API = "/login", // 登录系统后台接口
    VALIDATE_TOKEN = "/auth/validateToken", // token 校验接口
}

export const userLoginAPI = (
    data: loginReq,
): Promise<CustomSuccessData<loginResp>> => {
    return http.post<loginResp>(API.LOGIN_API, data);
};

export const validateTokenAPI = () => {
    return http.post(API.VALIDATE_TOKEN);
};
