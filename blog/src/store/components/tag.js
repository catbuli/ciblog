import axios from 'axios'
import router from '@/router'

import {
    Message,
    Notification
} from 'element-ui';

export default {
    state: {
        tagList: []
    },
    mutations: {
        setTagData(state, data) {
            state.tagList = data;
        }
    },
    actions: {
        getTagListAction(context) {
            axios
                .post("/api/api/client/tag")
                .then(res => {
                    context.commit('setTagData', res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        delTagAction(context, data) {
            axios
                .post("/api/api/client/tag/del", {
                    mid: data,
                })
                .then(res => {
                    if (res.data.code == 200) {
                        Notification({
                            title: "成功",
                            message: "标签删除成功！",
                            type: "success"
                        });
                        context.dispatch('getTagListAction');
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
        addTagAction(context, data) {
            axios
                .post("/api/api/client/tag/add", {
                    name: data,
                })
                .then(res => {
                    if (res.data.code == 200) {
                        // router.push('/admin/manage_category')
                        Message({
                            message: "标签添加成功！",
                            type: "success"
                        });
                        context.dispatch('getTagListAction');
                    } else {
                        Message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    modules: {}
}