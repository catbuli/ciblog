import axios from '../../http/index'
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
        countList: {
            articleCount: "",
            CategoryCount: "",
            commentCount: ""
        }
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
        },
        setCountList(state, data) {
            state.countList = data;
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
                        console.log('tag', '')
                        router.push("/admin");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        alterPassAction(context, data) {
            axios
                .post("/api/api/client/login/alterpass", data)
                .then(res => {
                    if (res.data.code == 200) {
                        Notification({
                            title: "成功",
                            message: "密码修改成功",
                            type: "success"
                        });
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
        getCountAction(context, data) {
            axios
                .post("/api/api/client/count")
                .then(res => {
                    if (res.data.code == 200) {
                        context.commit('setCountList', res.data.data);
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
        }
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