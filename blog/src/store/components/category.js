import axios from 'axios'
import {
    Message
} from 'element-ui';

export default {
    state: {
        categoryList: []
    },
    mutations: {
        setCategoryData(state, data) {
            state.categoryList = data;
        }
    },
    actions: {
        getCategoryListAction(context) {
            axios
                .post("/api/api/client/category")
                .then(res => {
                    context.commit('setCategoryData', res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
    modules: {}
}