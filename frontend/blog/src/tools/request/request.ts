import axios from "axios";

const request = axios.create({
    baseURL: "http://127.0.0.1:9090/api/blog",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error);
        return Promise.reject(new Error(error.message));
    },
);

export default request;
