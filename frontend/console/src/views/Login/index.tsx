import { userLoginAPI } from "@/api/auth";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [passport, setPassport] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem("showInvalidTokenMsg") === "true") {
            message.warning("登录状态失效", 1);
            localStorage.removeItem("showInvalidTokenMsg");
        }
    }, []);

    const handleLogin = async () => {
        if (passport === "" || password === "") {
            message.error("用户名和密码不能为空", 1);
            return;
        }

        try {
            const jsonResp = await userLoginAPI({ passport: passport, password: password });
            if (jsonResp.code === 0) {
                message.success("登录成功", 1);
                localStorage.setItem("token", jsonResp.data.token);
                localStorage.setItem("userId", jsonResp.data.id.toString());
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                message.error("用户名或密码错误", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    };

    return (
        <>
            <div className="login-page w-screen h-screen bg-zinc-800 relative bg-login bg-center bg-cover">
                <div
                    className="login-wrapper bg-slate-400/20 absolute inset-2/4 
                     -translate-x-2/4 -translate-y-2/4 w-1/4 h-96 
                     font-main rounded-xl backdrop-blur-3xl"
                >
                    <div className="greeter mt-10 mb-8 text-3xl flex justify-center text-slate-50 font-code">
                        <span>Welcome</span>
                    </div>
                    <div className="login-form flex flex-col flex-1 items-center">
                        <input
                            type="text"
                            placeholder="Please enter passport"
                            className="w-3/4 h-10 pl-4 mb-8 outline-none text-slate-50 focus:outline-offset-2 bg-slate-700/30 rounded-sm"
                            value={passport}
                            onChange={(e) => {
                                setPassport(e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Please enter password"
                            className="w-3/4 h-10 pl-4 mb-8 outline-none text-slate-50 focus:outline-offset-2 bg-slate-700/30 rounded-sm"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <button className="login-btn btn-violet mb-8 w-3/4" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
