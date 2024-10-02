export interface userItem {
    id: number;
    passport: string;
    nickname: string;
    avatar: string;
    email: string;
    github: string;
    introduction: string;
    resume: string;
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

// deleteUser Request and Response
export interface deleteUserReq {
    id: number;
}

export interface deleteUserResp {}

// updateUser Request and Response
export interface updateUserReq {
    id: number;
    nickname: string;
    email: string;
    github: string;
}

export interface updateUserResp {}
