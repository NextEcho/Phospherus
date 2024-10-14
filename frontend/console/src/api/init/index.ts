import { CustomSuccessData } from "@/tools/request";

import http from "@/tools/request";
import { initSystemReq, initSystemResp } from "./types";

enum API {
    VALIDATE_INIT_STATUS = "/validateInitStatus", // 初始化状态校验接口
    INIT_SYSTEM = "/initSystem", // 初始化系统接口
}

export const validateInitStatusAPI = () => {
    return http.post(API.VALIDATE_INIT_STATUS);
};

export const initSystemAPI = (
    data: initSystemReq,
): Promise<CustomSuccessData<initSystemResp>> => {
    return http.post<initSystemResp>(API.INIT_SYSTEM, data);
};
