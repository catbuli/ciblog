import {
    post
} from '@/http'

export default {
    state: {
        tagList: []
    },
    mutations: {
        setTagList(state, data) {
            state.tagList = data;
        }
    },
    actions: {
        getTagListAction(context) {
            post("/tag", {}, (data) => {
                context.commit('setTagList', data.data);
            });
        },
        delTagAction(context, data) {
            post("/tag/del", {
                mid: data
            }, (data) => {
                context.dispatch('getTagListAction');
            });
        },
        addTagAction(context, data) {
            post("/tag/add", {
                name: data,
            }, (data) => {
                context.dispatch('getTagListAction');
            });
        }
    },
    modules: {}
}