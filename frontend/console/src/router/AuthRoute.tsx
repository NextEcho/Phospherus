import { message } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token") || "";
        if (!token) {
            message.warning("请先登录", 1);
            navigate("/auth/login", { replace: true });
        }
    }, [navigate]);

    return <Outlet />;
};

export default AuthRoute;
