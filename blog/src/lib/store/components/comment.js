import {
    post
} from '@/lib/http'
import router from '@/pages/index/router'


export default {
    state: {
        commentList: [],
        comment: {},
    },
    mutations: {
        setCommentList(state, data) {
            state.commentList = data;
        },
        setComment(state, data) {
            state.comment = data;
        },
    },
    actions: {
        getCommentAction(context, data) {
            post("/commentc/byid", {
                cid: data
            }, (data) => {
                context.commit('setComment', data.data);
            });
        },
        getCommentListAction(context, data) {
            post("/commentc", {
                paging: data
            }, (data) => {
                context.commit('setCommentList', data.data);
                context.commit('setPaging', data.paging);
            });
        },
        addCommentAction({
            rootState,
            dispatch
        }, data) {
            post("/commentc/add", {
                data: data
            }, () => {
                dispatch('getCommentListAction', rootState.global.paging);
            });
        },
        editCommentAction({
            rootState,
            dispatch
        }, data) {
            post("/commentc/edit", {
                cid: data.cid,
                content: data.content,
            }, () => {
                dispatch('getCommentListAction', rootState.global.paging);
            });
        },
        editCommentStatusAction({
            rootState,
            dispatch
        }, data) {
            post("/commentc/editstatus", {
                cid: data.cid,
                status: data.status
            }, () => {
                dispatch('getCommentListAction', rootState.global.paging);
            });
        },
        delCommentAction({
            rootState,
            dispatch
        }, data) {
            post("/commentc/del", {
                cid: data
            }, () => {
                dispatch('getCommentListAction', rootState.global.paging);
            });
        }
    },
    modules: {}
}