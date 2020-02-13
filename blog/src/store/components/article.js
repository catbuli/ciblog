import {
    post
} from '@/http'
import router from '@/router'


export default {
    state: {
        articleList: [],
        article: {},
        previous: {},
        next: {}
    },
    mutations: {
        setArticleList(state, data) {
            state.articleList = data;
        },
        setArticle(state, data) {
            state.article = data.present;
            state.previous = data.previous;
            state.next = data.next;
        }
    },
    actions: {
        getArticleDataAction(context, data) {
            axios
                .post("/articlec/byid", {
                    aid: data
                })
                .then(res => {
                    context.commit('setArticle', res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getArticleListAction(context, data) {
            post("/articlec", {
                paging: data
            }, (data) => {
                console.log(data)
                context.commit('setArticleList', data.data);
                context.commit('setPaging', data.data);
            });
        },

        addArticleAction({
            rootState,
            dispatch
        }, data) {
            axios
                .post("/articlec/add", {
                    data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        router.push('/admin/manage_article')
                        dispatch('getArticleListAction', rootState.global.paging);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        editArticleAction(context, data) {
            axios
                .post("/articlec/edit", {
                    data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        router.push('/admin/manage_article')
                        context.dispatch('getArticleListAction');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        delArticleAction({
            rootState,
            dispatch
        }, data) {
            axios
                .post("/articlec/del", {
                    aid: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        dispatch('getArticleListAction', rootState.global.paging);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    modules: {}
}