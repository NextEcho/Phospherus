import { getUserInfoAPI } from "@/api/user";
import { create } from "zustand";

interface UserInfo {
    id: number;
    passport: string;
    email: string;
    github: string;
    avatar: string;
    nickname: string;
    introduction: string;
    resume: string;
}

interface UserStore {
    userInfo: UserInfo;
    setUserInfo: (userInfo: UserInfo) => void;
    getUserInfo: () => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
    userInfo: {
        id: 0,
        passport: "",
        email: "",
        github: "",
        avatar: "",
        nickname: "",
        introduction: "",
        resume: "",
    },
    setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
    getUserInfo: async () => {
        const userId = localStorage.getItem("userId");
        const jsonResp = await getUserInfoAPI({ id: Number(userId) });
        if (jsonResp.code === 0) {
            set({ userInfo: jsonResp.data });
        }
    },
}));

export default useUserStore;
