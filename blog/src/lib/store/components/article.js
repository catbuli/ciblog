import {
    post
} from '@/lib/http'
import router from '@/pages/index/router'
import adminRouter from '@/pages/admin/router'


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
            data.forEach((element, index) => {
                if (element.status > 0) {
                    element = JSON.parse(element.draft);
                    data[index].title = element.title;
                }
            });
        },
        setArticle(state, data) {
            if (data.present.status > 0) {
                let value = JSON.parse(data.present.draft);
                state.article = value;
                state.article.aid = data.present.aid;
                state.article.create_date = data.present.create_date;
            } else {
                state.article = data.present;
                state.previous = data.previous;
                state.next = data.next;
            }
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
                adminRouter.push('/admin/manage_article')
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
                context.commit('setArticle', resp.data);
            });
        }
    },
    modules: {}
}