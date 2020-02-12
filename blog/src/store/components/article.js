import axios from '@/http'
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
        getArticleListAction(context) {
            axios
                .post("/articlec")
                .then(res => {
                    context.commit('setArticleList', res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addArticleAction(context, data) {
            axios
                .post("/articlec/add", {
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
        delArticleAction(context, data) {
            axios
                .post("/articlec/del", {
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