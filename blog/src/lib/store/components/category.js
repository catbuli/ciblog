import {
    post
} from '@/lib/http'
import router from '@/index/router'

export default {
    state: {
        categoryList: [],
    },
    mutations: {
        setCategoryList(state, data) {
            state.categoryList = data;
        },
    },
    actions: {
        getCategoryListAction(context) {
            post("/category", {}, (data) => {
                context.commit('setCategoryList', data.data);
            });
        },
        addCategoryAction(context, data) {
            post("/category/add", {
                name: data.name,
                description: data.description
            }, (data) => {
                router.push('/admin/manage_category')
                context.dispatch('getCategoryListAction');
            });
        },
    },
    modules: {}
}