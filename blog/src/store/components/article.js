import axios from '@/http'
import router from '@/router'


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
                .post("/api/articlec/byid", {
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
                .post("/api/articlec")
                .then(res => {
                    context.commit('setArticleList', res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addArticleAction(context, data) {
            axios
                .post("/api/articlec/add", {
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
        editArticleAction(context, data) {
            axios
                .post("/api/articlec/edit", {
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
        delArticleAction(context, data) {
            axios
                .post("/api/articlec/del", {
                    aid: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        context.dispatch('getArticleListAction');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    modules: {}
}