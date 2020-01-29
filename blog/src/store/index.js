import Vue from 'vue'
import Vuex from 'vuex'
import global_store from '../store/components/global.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        test2: 'sdasdsd'
    },
    mutations: {},
    actions: {},
    modules: {
        global: global_store
    }
})