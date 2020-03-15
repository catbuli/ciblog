import Vue from 'vue'
import Vuex from 'vuex'
import global_store from '../store/components/global.js'
import category_store from '../store/components/category.js'
import tag_store from '../store/components/tag.js'
import article_store from '../store/components/article.js'
import comment_store from '../store/components/comment.js'
import file_store from '../store/components/file.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        global: global_store,
        category: category_store,
        tag: tag_store,
        article: article_store,
        comment: comment_store,
        file: file_store,
    }
})