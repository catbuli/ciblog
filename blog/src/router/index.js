import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ArticleList from '../views/ArticleList.vue'
import Article from '../views/Article.vue'
import Admin from '../views/Admin.vue'
import personalSettings from '../components/admin/personalSettings.vue'
import writePost from '../components/admin/writePost.vue'
import manageCategory from '../components/admin/manageCategory.vue'
import addCategory from '../components/admin/addCategory.vue'

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
        }, {
            path: '/admin/manage_category',
            name: 'manage_category',
            component: manageCategory,
        }, {
            path: '/admin/add_category',
            name: 'add_category',
            component: addCategory,
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router