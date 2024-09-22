export interface userItem {
    id: number;
    passport: string;
    nickname: string;
    avatar: number;
    email: number;
    github: number;
    value?: number;
    label?: string;
}

// getUserList Request and Response
export interface getUserListReq {
    pageNum: number;
    pageSize: number;
}

export interface getUserListResp {
    pageNum: number;
    pageSize: number;
    total: number;
    userList: userItem[];
}
