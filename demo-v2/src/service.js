import axios from "axios";
import { getToken } from "@/utils/setToken.js"
import { Message } from 'element-ui';

// axios 封装
const instance = axios.create({
    baseURL: '/api', //baseURL 会自动加在请求地址上
    timeout: 3000,
});


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    //在请求之前做些什么（获取并设置token）
    config.headers['token'] = getToken('token');
    return config;
}, function (error) {
    return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    let { status, message } = response.data
    if (status !== 200) {
        Message({ message: message || 'error', type: 'warning' })
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;