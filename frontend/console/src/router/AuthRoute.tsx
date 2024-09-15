import { validateTokenAPI } from "@/api/auth";
import { message } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
    const navigate = useNavigate();

    const validateToken = async () => {
        const jsonResp = await validateTokenAPI();
        if (jsonResp.code === 1000) {
            // code 1000 represent invalid token holding
            message.warning("登录状态过期", 1);
            navigate("/auth/login", { replace: true });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token") || "";
        if (!token) {
            message.warning("请登录", 1);
            navigate("/auth/login", { replace: true });
        } else {
            validateToken();
        }
    }, [navigate]);

    return <Outlet />;
};

export default AuthRoute;
