import { validateTokenAPI } from "@/api/auth";
import { validateInitStatusAPI } from "@/api/init";
import { message } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
    const navigateTo = useNavigate();

    useEffect(() => {
        validateInitStatusAndToken();
    }, []);

    // 先验证初始化状态，然后验证 token
    const validateInitStatusAndToken = async () => {
        try {
            // 先验证初始化状态
            const initStatusResp = await validateInitStatusAPI();
            if (initStatusResp.code === -1) {
                message.warning("系统未初始化", 1);
                navigateTo("/init", { replace: true });
                return;
            }

            // 初始化状态验证通过后，再验证 token
            const token = localStorage.getItem("token") || "";
            if (!token) {
                message.warning("请登录", 1);
                navigateTo("/login", { replace: true });
                return;
            }

            const tokenResp = await validateTokenAPI();
            if (tokenResp.code === 1000) {
                message.warning("登录状态过期", 1);
                navigateTo("/login", { replace: true });
            }
        } catch (error) {
            console.error("验证过程中出错:", error);
            message.error("验证过程中出错，请稍后重试");
        }
    };

    return <Outlet />;
};

export default AuthRoute;
