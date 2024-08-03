import { userLoginAPI } from "@/api/auth";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [passport, setPassport] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (passport == "" || password == "") {
      message.error("用户名和密码不能为空", 1);
      return
    }

    const jsonResp = await userLoginAPI({ passport: passport, password: password });
    console.log(" resp => ", jsonResp);
    if (jsonResp.code === 0) {
      message.success("登录成功", 1);
      setInterval(() => {
        navigate("/console");
      }, 1000);
    } else {
      message.error("用户名或密码错误", 1);
    }
  };

  return (
    <>
      <div className="login-page w-screen h-screen bg-zinc-800 relative bg-login bg-center bg-cover">
        <div
          className="login-wrapper bg-slate-400/30 absolute inset-2/4 
                     -translate-x-2/4 -translate-y-2/4 w-1/4 h-96 
                     font-mono rounded-xl backdrop-blur-xl"
        >
          <div className="greeter mt-10 mb-8 text-3xl flex justify-center text-slate-50">
            <span>Login</span>
          </div>
          <div className="login-form flex flex-col flex-1 items-center">
            <input
              type="text"
              placeholder="Passport"
              className="w-3/4 h-10 pl-4 mb-8 outline-none focus:outline-offset-2 focus:outline-indigo-500"
              value={passport}
              onChange={(e) => {
                setPassport(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-3/4 h-10 pl-4 mb-8 outline-none focus:outline-offset-2 focus:outline-indigo-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="login-btn btn-primary mb-8 w-3/4" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
