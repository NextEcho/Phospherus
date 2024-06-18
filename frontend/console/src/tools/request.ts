import axios, { AxiosInstance } from "axios";

const request: AxiosInstance = axios.create({
    baseURL: "http://localhost:8989/api/console",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer "
    },
});

// add interceptors of request
request.interceptors.request.use(
    (config) => {
        // handle some request
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// add interceptors of response
request.interceptors.response.use(
    (response) => {
        // handle some response
        return response.data;
    },
    (error) => {
        console.log(error);
        return Promise.reject(new Error(error.message));
    },
);

export default request;
