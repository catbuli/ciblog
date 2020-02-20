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
        getArticleListAction(context, data) {
            post("/articlec", {
                paging: data
            }, (data) => {
                context.commit('setArticleList', data.data);
                context.commit('setPaging', data.paging);
            });
        },
        getArticleDataAction(context, data) {
            post("/articlec/byid", {
                aid: data
            }, (data) => {
                context.commit('setArticle', data.data);
            });
        },
        publishArticleAction({
            rootState,
            dispatch
        }, data) {
            post("/articlec/publish", {
                data
            }, (data) => {
                router.push('/admin/manage_article')
            });
        },
        delArticleAction({
            rootState,
            dispatch
        }, data) {
            post("/articlec/del", {
                aid: data
            }, (data) => {
                dispatch('getArticleListAction', rootState.global.paging);
            });
        },
        draftAction(context, data) {
            post("/articlec/draft", {
                data: data
            }, resp => {
                context.dispatch('getArticleDataAction', resp.data.aid);
            });
        }
    },
    modules: {}
}