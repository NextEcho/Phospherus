export interface userItem {
    id: number;
    passport: string;
    github: string;
    introduction: number;
}

// getTagList Request and Response
export interface getUserInfoReq {
    id: number;
}

export interface getUserInfoResp {
    id: number;
    passport: string;
    nickname: string;
    avatar: string;
    signature: string;
    email: string;
    github: string;
    introduction: string;
}
