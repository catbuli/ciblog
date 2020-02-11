import axios from '@/http'
import router from '@/router'


export default {
    state: {
        commentList: [],
        comment: {},
        paging: {
            pageSize: 10,
            currentPage: 1,
            type: -1,
            total: 0,
            typeName: "",
        }
    },
    mutations: {
        setCommentList(state, data) {
            state.commentList = data;
        },
        setComment(state, data) {
            state.comment = data;
        },
        setPaging(state, data) {
            state.paging = data;
        }
    },
    actions: {
        getCommentDataAction(context, data) {
            axios
                .post("/api/commentc/byid", {
                    aid: data
                })
                .then(res => {
                    context.commit('setComment', res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getCommentListAction(context, data) {
            axios
                .post("/api/commentc", {
                    paging: data
                })
                .then(res => {
                    context.commit('setCommentList', res.data.data);
                    context.commit('setPaging', res.data.paging);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addCommentAction(context, data) {
            axios
                .post("/api/commentc/add", {
                    data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        context.dispatch('getCommentDataAction', data.aid);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        editCommentAction(context, data) {
            axios
                .post("/api/commentc/edit", {
                    data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        router.push('/admin/manage_comment')
                        context.dispatch('getCommentListAction');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        editCommentStatusAction({
            rootState,
            dispatch
        }, data) {
            axios
                .post("/api/commentc/editstatus", {
                    cid: data.cid,
                    status: data.status
                })
                .then(res => {
                    dispatch('getCommentListAction', rootState.comment.paging);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        delCommentAction({
            rootState,
            dispatch
        }, data) {
            axios
                .post("/api/commentc/del", {
                    cid: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        dispatch('getCommentListAction', rootState.comment.paging);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    modules: {}
}