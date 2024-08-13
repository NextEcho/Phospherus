import { message } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigateTo = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token") || "";
        if (!token) {
            message.warning("登录状态过期", 1);
            navigateTo("/auth/login", { replace: true });
        } else {
            setIsAuthenticated(true);
        }
    }, [navigateTo]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : null;
};

export default AuthRoute;
