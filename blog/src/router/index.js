import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ArticleList from '../views/ArticleList.vue'
import Article from '../views/Article.vue'
import Admin from '../views/Admin.vue'
import personalSettings from '../components/admin/personalSettings.vue'
import writePost from '../components/admin/writePost.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/articleList',
        name: 'articleList',
        component: ArticleList,
    },
    {
        path: '/article/:id',
        name: 'article',
        component: Article
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        children: [{
            path: '/admin',
            name: 'personal_settings',
            component: personalSettings,
        }, {
            path: '/admin/write_post',
            name: 'write_post',
            component: writePost,
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router