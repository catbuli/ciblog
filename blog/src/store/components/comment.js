import {
    post
} from '@/http'
import router from '@/router'


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
    watch: {
        "$store.state.global.paging": function () {
            this.paging = this.$store.state.global.paging;
        }
    },
    actions: {
        getCommentDataAction(context, data) {
            post("/commentc/byid", {
                aid: data
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
        addCommentAction(context, data) {
            post("/commentc/add", {
                data: data
            }, () => {
                context.dispatch('getCommentDataAction', data.aid);
            });
        },
        editCommentAction(context, data) {
            post("/commentc/edit", {
                data
            }, () => {
                router.push('/admin/manage_comment')
                context.dispatch('getCommentListAction');
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