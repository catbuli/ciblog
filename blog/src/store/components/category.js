import {
    post
} from '@/http'
import router from '@/router'

export default {
    state: {
        categoryList: []
    },
    mutations: {
        setCategoryList(state, data) {
            state.categoryList = data;
        }
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
        editCategoryAction(context, data) {
            console.log('editCategoryAction')
        },
        delCategoryAction(context, data) {
            post("/category/del", {
                mid: data
            }, (data) => {
                context.dispatch('getCategoryListAction');
            });
        }
    },
    modules: {}
}