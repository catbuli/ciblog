import axios from 'axios';
import {
    Notification
} from 'element-ui';

let instance = axios.create();

instance.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        // config.data = JSON.stringify(config.data);
        config.headers = {
            "Accept": "application/json",
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
        console.log(response.data)
        switch (response.data.code) {
            case 200: {
                Notification({
                    title: response.data.title,
                    message: response.data.message,
                    type: "success"
                });
                break;
            }
            case 201: {
                break;
            }
            case 400: {
                Notification({
                    title: response.data.title,
                    message: response.data.message,
                    type: "error"
                });
                break;
            }
            case 401: {
                Notification({
                    title: response.data.title,
                    message: response.data.message,
                    type: "error"
                });
                break;
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

export default instance;