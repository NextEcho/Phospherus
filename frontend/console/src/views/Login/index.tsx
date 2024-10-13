import { userLoginAPI } from "@/api/auth";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [passport, setPassport] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (passport === "" || password === "") {
            setErrorMessage("用户名和密码不能为空");
            return;
        }

        try {
            const jsonResp = await userLoginAPI({ passport, password });
            if (jsonResp.code === 0) {
                localStorage.setItem("token", jsonResp.data.token);
                localStorage.setItem("userId", jsonResp.data.id.toString());
                message.success("登录成功", 1);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setErrorMessage("用户名或密码错误");
            }
        } catch (err) {
            console.log("捕获 error:", err);
            setErrorMessage("登录失败，请稍后重试");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#222943] p-4">
            <div className="bg-[#272E48] p-8 sm:p-12 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl w-full max-w-[480px]">
                <div className="text-3xl font-extrabold text-slate-50 font-main mb-8 text-center flex justify-center items-center">
                    <div className="bg-logo bg-cover w-10 h-10 mr-4"></div>
                    <span className="text-slate-100">欢迎登录</span>
                </div>
                <form onSubmit={handleLogin} className="space-y-8">
                    <div>
                        <input
                            type="text"
                            placeholder="请输入用户名"
                            className="w-full px-4 py-3 rounded-md bg-[#1E2538] text-slate-50 placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                            value={passport}
                            onChange={(e) => setPassport(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="请输入密码"
                            className="w-full px-4 py-3 rounded-md bg-[#1E2538] text-slate-50 placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && (
                        <div className="text-red-400 text-sm text-center animate-pulse">
                            {errorMessage}
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full btn-violet text-slate-100 py-3 rounded-md transition-all duration-300 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        >
                            登录
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
