import axios from 'axios'
import router from '@/router'

import {
    Notification
} from 'element-ui';

export default {
    state: {
        articleList: []
    },
    mutations: {
        setArticleList(state, data) {
            state.articleList = data;
        }
    },
    actions: {
        getArticleListAction(context) {
            axios
                .post("/api/api/client/articlec")
                .then(res => {
                    context.commit('setArticleList', res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addArticleAction(context, data) {
            axios
                .post("/api/api/client/article/add", data)
                .then(res => {
                    if (res.data.code == 200) {
                        router.push('/admin/manage_article')
                        Notification({
                            title: "成功",
                            message: "分类添加成功！",
                            type: "success"
                        });
                        context.dispatch('getArticleListAction');
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
        },
        delArticleAction(context, data) {
            axios
                .post("/api/api/client/article/del", {
                    mid: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        Notification({
                            title: "成功",
                            message: "分类删除成功！",
                            type: "success"
                        });
                        context.dispatch('getarticleListAction');
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
    },
    modules: {}
}