import Vue from 'vue'
import Vuex from 'vuex'
import global_store from '../store/components/global.js'
import category_store from '../store/components/category.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        test: 'test data'
    },
    mutations: {},
    actions: {},
    modules: {
        global: global_store,
        category: category_store
    }
})