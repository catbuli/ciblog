import axios from 'axios'
import router from '@/router'

import {
    Notification
} from 'element-ui';

export default {
    state: {
        articleList: [],
        article: {}
    },
    mutations: {
        setArticleList(state, data) {
            state.articleList = data;
        },
        setArticle(state, data) {
            state.article = data;
        }
    },
    actions: {
        getArticleDataAction(context, data) {
            axios
                .post("/api/api/client/articlec/byid", {
                    aid: data
                })
                .then(res => {
                    context.commit('setArticle', res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
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
                .post("/api/api/client/articlec/add", {
                    data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        router.push('/admin/manage_article')
                        Notification({
                            title: "成功",
                            message: "文章发布成功！",
                            type: "success"
                        });
                        context.dispatch('getArticleListAction');
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
        delArticleAction(context, data) {
            axios
                .post("/api/api/client/articlec/del", {
                    aid: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        Notification({
                            title: "成功",
                            message: "文章删除成功！",
                            type: "success"
                        });
                        context.dispatch('getArticleListAction');
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