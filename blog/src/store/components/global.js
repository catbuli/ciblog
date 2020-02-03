import axios from 'axios'
import router from '@/router'
import {
    Message,
    Notification
} from 'element-ui';

export default {
    state: {
        personalData: {},
        isShowLeftNav: false,
        isLogin: false,
    },
    mutations: {
        setPersonalData(state, data) {
            state.personalData = data;
        },
        setLoginStatu(state, data) {
            if (data) {
                state.isLogin = true;
            } else {
                state.isLogin = false;
            }
        }
    },
    actions: {
        getPersonalDataAction(context) {
            axios
                .post("/api/api/client/personal")
                .then(res => {
                    context.commit('setPersonalData', res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        updatePersonalDataAction(context, data) {
            axios
                .post("/api/api/client/personal/update", {
                    data: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        Message({
                            message: "个人信息更新成功！",
                            type: "success"
                        });
                        context.dispatch('getPersonalDataAction');
                    } else {
                        Notification({
                            title: "失败",
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        loginAction(context, data) {
            axios
                .post("/api/api/client/login", {
                    name: data.name,
                    password: data.password
                })
                .then(res => {
                    if (res.data.code == 200) {
                        router.push("/admin");
                        context.commit('setLoginStatu', true);
                        Notification({
                            title: "欢迎",
                            message: "管理员-" + res.data.data.name,
                            type: "success"
                        });
                    }
                    // else {
                    //     Notification({
                    //         title: "失败",
                    //         message: res.data.message,
                    //         type: "error"
                    //     });
                    // }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    modules: {}
}