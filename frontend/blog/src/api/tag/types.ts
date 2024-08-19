export interface tagItem {
  id: number;
  name: string;
  count: number;
  backgroundColor: string;
}

// getTagList Request and Response
export interface getTagListReq {}

export interface getTagListResp {
  tagList: tagItem[];
}
