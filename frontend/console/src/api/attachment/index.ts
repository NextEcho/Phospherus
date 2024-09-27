import http, { CustomSuccessData } from "@/tools/request";
import { deleteAttachmentReq, deleteAttachmentResp, getAttachmentReq, getAttachmentResp, uploadAttachmentResp } from "./types";

enum API {
    UPLOAD_ATTACHMENT = "/attachment/uploadAttachment",
    GET_ATTACHMENT = "/attachment/getAttachment",
    DELETE_ATTACHMENT = "/attachment/deleteAttachment",
}

export const uploadAttachmentAPI = (data: FormData): Promise<CustomSuccessData<uploadAttachmentResp>> => {
    return http.post<uploadAttachmentResp>(API.UPLOAD_ATTACHMENT, data, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
    });
};

export const getAttachmentAPI = (data: getAttachmentReq): Promise<CustomSuccessData<getAttachmentResp>> => {
    return http.get<getAttachmentResp>(API.GET_ATTACHMENT, data);
};

export const deleteAttachmentAPI = (data: deleteAttachmentReq): Promise<CustomSuccessData<deleteAttachmentResp>> => {
    return http.post<deleteAttachmentResp>(API.DELETE_ATTACHMENT, data);
};

