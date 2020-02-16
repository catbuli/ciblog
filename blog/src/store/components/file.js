import {
    post
} from '@/http'

export default {
    state: {
        fileList: []
    },
    mutations: {
        setFileList(state, data) {
            state.fileList = data;
        }
    },
    actions: {
        getFileListAction(context, data) {
            post("/upload", {
                paging: data
            }, (data) => {
                context.commit('setFileList', data.data);
            });
        },
        delFileAction({
            rootState,
            dispatch
        }, data) {
            post("/upload/del", {
                fid: data
            }, (data) => {
                dispatch('getFileListAction', rootState.global.paging);
            });
        },
    },
    modules: {}
}