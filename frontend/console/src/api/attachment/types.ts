export interface attachmentItem {
    id: number;
    name: string;
    url: string;
    type: number;
    typeName: string;
    size: number;
    createdAt: string;
    creator: string;
    creatorId: number;
    value?: number;
    label?: string;
}
// uploadAttachment Request and Response
export interface uploadAttachmentReq {}

export interface uploadAttachmentResp {
    url: string;
}

// getAttachment Request and Response
export interface getAttachmentReq {
    id: number;
}

export interface getAttachmentResp {
    id: number;
    name: string;
    url: string;
    type: number;
    typeName: string;
    size: number;
    createdAt: string;
    creator: string;
    creatorId: number;
}

// deleteAttachment Request and Response
export interface deleteAttachmentReq {
    id: number;
}

export interface deleteAttachmentResp {}

// getAttachmentList Request and Response
export interface getAttachmentListReq {
    pageNum: number;
    pageSize: number;
}

export interface getAttachmentListResp {
    pageNum: number;
    pageSize: number;
    total: number;
    attachmentList: attachmentItem[];
}
