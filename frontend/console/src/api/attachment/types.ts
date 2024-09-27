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
  url: string;
  name: string;
  size: number;
  type: string;
  ext: string;
}

// deleteAttachment Request and Response
export interface deleteAttachmentReq {
  id: number;
}

export interface deleteAttachmentResp {}
