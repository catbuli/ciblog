import axios from 'axios';
import router from '@/pages/index/router'
import adminRouter from '@/pages/admin/router.js'
import {
    Notification
} from 'element-ui';

let instance = axios.create();
let baseUrl = '';

if (process.env.NODE_ENV == 'development') {
    baseUrl = '/api';
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = process.env.VUE_APP_URL;
}

instance.defaults.timeout = 10000; //设置请求时间
instance.defaults.baseURL = baseUrl; //设置默认接口地址

instance.interceptors.request.use(
    config => {
        // config.data = JSON.stringify(config.data);
        config.headers = {
            // "Accept": "application/json",
            'token': localStorage.getItem('token') ? localStorage.getItem('token') : '',
            'uid': localStorage.getItem('uid') ? localStorage.getItem('uid') : 0,
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        switch (response.data.code) {
            // 调用成功返回数据 弹出提示信息
            case 200: {
                Notification({
                    title: response.data.title,
                    message: response.data.message,
                    type: "success",
                    offset: 50
                });
                break;
            }
            // 调用成功返回数据 没有提示细腻
            case 201: {
                break;
            }
            // 接口出现错误 返回错误信息并提示
            case 400: {
                Notification({
                    title: response.data.title,
                    message: response.data.message,
                    type: "error",
                    offset: 50
                });
                break;
            }
            // 登陆失效
            case 402: {
                Notification({
                    title: response.data.title,
                    message: response.data.message,
                    type: "error",
                    offset: 50
                });
                localStorage.removeItem('uid');
                localStorage.removeItem('token');
                break;
            }
            // 文章没找到  或者其他页面获取错误 返回404
            case 404: {
                Notification({
                    title: response.data.title,
                    message: response.data.message,
                    type: "error",
                    offset: 50
                });
                router.push('/404')
            }
            default: {
                // router.push('/404')
            }
        }
        return response;
    },
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)


/**
 * 封装post请求
 * @param url 请求url
 * @param data 请求参数
 * @param fn 回调函数
 * @returns {Promise}
 */
export function post(url, data = {}, fn) {
    return new Promise((resolve, reject) => {
        instance.post(url, data)
            .then(response => {
                // resolve(response.data);
                fn(response.data);
            }, err => {
                reject(err)
            })
    })
}


export default instance;