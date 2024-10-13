import { useUserStore } from "@/store";
import { useEffect } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { RiLogoutCircleRFill, RiMailAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const { userInfo, getUserInfo } = useUserStore();

    useEffect(() => {
        getUserInfo();
    }, []);

    const navigationTo = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigationTo("/auth/login");
    };

    return (
        <div
            className="navigation relative flex justify-between items-center h-full
                    after:top-0 after:left-0 after:absolute after:bg-banner after:shadow-[0_0_50px_30px_#000000]
                    after:w-full after:h-full after:bg-cover after:bg-center after:opacity-20 after:pointer-events-none
                    shadow-xl py-0 px-10"
        >
            <div className="left-zone flex">
                <div className="avatar bg-cover w-24 h-24">
                    <img src={userInfo.avatar} alt="avatar" className="rounded-full bg-cover bg-center" />
                </div>
                <div className="info ml-4 font-main flex flex-1 flex-col justify-around">
                    <div className="name text-lg">{userInfo.nickname}</div>
                    <div className="email text-sm text-slate-400 cursor-pointer">
                        <RiMailAddFill className="inline-block mr-2" />
                        <span>{userInfo.email}</span>
                    </div>
                </div>
            </div>
            <div className="right-zone flex items-center h-full">
                <button
                    className="logout-btn flex items-center justify-center px-4 py-2 bg-transparent hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
                    onClick={handleLogout}
                >
                    <IoLogOutOutline className="text-3xl mr-2" />
                    <span className="text-lg font-semibold">退出登录</span>
                </button>
            </div>
        </div>
    );
};

export default NavBar;
