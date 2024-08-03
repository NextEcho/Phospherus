export interface loginReq {
  passport: string;
  password: string;
}

export interface loginResp {
  id: number;
  token: string;
}
