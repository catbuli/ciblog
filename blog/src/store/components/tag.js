import axios from 'axios'
import router from '@/router'

import {
    Message
} from 'element-ui';

export default {
    state: {
        tagList: []
    },
    mutations: {
        setTagData(state, data) {
            state.tagList = data;
        }
    },
    actions: {
        getTagListAction(context) {
            axios
                .post("/api/api/client/tag")
                .then(res => {
                    context.commit('setCategoryData', res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addTagAction(context, data) {
            axios
                .post("/api/api/client/tag/add", {
                    name: data.name,
                    description: data.description
                })
                .then(res => {
                    if (res.data.code == 200) {
                        // router.push('/admin/manage_category')
                        Message({
                            message: "分类添加成功！",
                            type: "success"
                        });
                        context.dispatch('getPersonalDataAction');
                    } else {
                        Message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    modules: {}
}