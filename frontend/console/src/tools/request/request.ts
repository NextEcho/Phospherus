import axios, { AxiosError, AxiosResponse } from "axios";
import { message } from "antd";

// token 白名单，不需要 token 的请求路径
const tokenWhiteList = ["/api/console/login"];

interface ErrorResponse {
    code?: number;
}

const request = axios.create({
    baseURL: "http://localhost:8989/api/console",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use(
    (config) => {
        if (!tokenWhiteList.includes(config.url!)) {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

request.interceptors.response.use(
    (response: AxiosResponse) => {
        const { status, data } = response;
        if (status === 200) {
            return data;
        } else {
            return Promise.reject(data);
        }
    },

    (error: AxiosError<ErrorResponse>) => {
        if (JSON.stringify(error).includes("Network Error")) {
            message.error("网络超时", 1);
        }

        return Promise.reject(error);
    },
);

export default request;
