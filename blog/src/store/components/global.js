import axios from 'axios'
import router from '@/router'
import {
    Message,
    Notification
} from 'element-ui';

export default {
    state: {
        personalData: {},
        isAdmin: false,
        isShowLeftNav: false,
        isLogin: false,
        uid: localStorage.getItem('uid') ? localStorage.getItem('uid') : '',
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    },
    mutations: {
        isAdmin(state, data) {
            state.isAdmin = data;
        },
        handleLeftNav(state, data) {
            state.isShowLeftNav = data;
        },
        setPersonalData(state, data) {
            state.personalData = data;
        },
        setLoginStatus(state, data) {
            if (data.isLogin) {
                state.isLogin = true;
                state.uid = data.uid;
                state.token = data.token;
                localStorage.setItem('uid', data.uid);
                localStorage.setItem('token', data.token);
            } else {
                state.isLogin = false;
                state.uid = undefined;
                state.token = undefined;
                localStorage.removeItem('uid');
                localStorage.removeItem('token');
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
                        context.commit('setLoginStatus', {
                            isLogin: true,
                            uid: res.data.data.uid,
                            token: res.data.data.token,
                        });
                        router.push("/admin");
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
        },
        logoutAction(context, data) {
            axios
                .post("/api/api/client/login/logout")
                .then(res => {
                    if (res.data.code == 200) {
                        router.push("/login");
                        context.commit('setLoginStatus', {
                            isLogin: false
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // loginCheckAction() {
        //     axios
        //         .post("/api/api/client/login/check", {
        //             uid: localStorage.getItem['uid'],
        //         }, {
        //             headers: {
        //                 "Accept": "application/json",
        //                 'token': localStorage.getItem['token']
        //             },
        //         })
        //         .then(res => {
        //             if (res.data.code == 200) {
        //                 // router.push("/admin");
        //                 context.commit('setLoginStatus', {
        //                     isLogin: true,
        //                     uid: res.data.data.uid,
        //                     token: res.data.data.token,
        //                 });
        //                 Notification({
        //                     title: "欢迎",
        //                     message: "管理员-" + res.data.data.name,
        //                     type: "success"
        //                 });
        //             }
        //             // else {
        //             //     Notification({
        //             //         title: "失败",
        //             //         message: res.data.message,
        //             //         type: "error"
        //             //     });
        //             // }
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // },

    },
    modules: {}
}