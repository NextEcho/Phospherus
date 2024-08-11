import http, { CustomSuccessData } from "@/tools/request";
import { uploadFileResp } from "./types";

enum API {
    UPLOAD_FILE = "/file/upload",
}

export const uploadFileAPI = (data: FormData): Promise<CustomSuccessData<uploadFileResp>> => {
    return http.post<uploadFileResp>(API.UPLOAD_FILE, data, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
    });
};
