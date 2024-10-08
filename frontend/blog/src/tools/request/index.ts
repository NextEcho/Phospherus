import request from "@/tools/request/request";
import { AxiosRequestConfig } from "axios";

/**
 * 网络请求响应格式，T 是具体的接口返回类型数据
 */
export interface CustomSuccessData<T> {
    code: number;
    message: string;
    data: T;
}

/**
 * @description: 封装get请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const get = <T>(
    url: string,
    params?: string | object,
    config?: AxiosRequestConfig,
): Promise<CustomSuccessData<T>> => {
    config = {
        method: "get",
        url,
        ...config,
    };
    if (params) {
        config.params = params;
    }
    return request(config);
};

/**
 * @description: 封装post请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const post = <T>(
    url: string,
    data?: string | object,
    config?: AxiosRequestConfig,
): Promise<CustomSuccessData<T>> => {
    config = {
        method: "post",
        url,
        ...config,
    };
    if (data) {
        config.data = data;
    }
    return request(config);
};

/**
 * @description: 封装delete请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const remove = <T>(
    url: string,
    params?: string | object,
    config?: AxiosRequestConfig,
): Promise<CustomSuccessData<T>> => {
    config = {
        method: "delete",
        url,
        ...config,
    };
    if (params) {
        config.params = params;
    }
    return request(config);
};

// 包裹请求方法的容器,使用 http 统一调用
const http = {
    get,
    post,
    remove,
};

export default http;
