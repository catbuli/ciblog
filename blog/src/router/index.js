import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ArticleList from '../views/ArticleList.vue'
import Article from '../views/Article.vue'
import Admin from '../views/Admin.vue'
import personalSettings from '../components/admin/personalSettings.vue'
import writeArticle from '../components/admin/writeArticle.vue'
import manageCategory from '../components/admin/manageCategory.vue'
import addCategory from '../components/admin/addCategory.vue'
import manageTag from '../components/admin/manageTag.vue'
import index from '../components/admin/index.vue'

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
                name: 'index',
                component: index,
            }, {
                path: '/admin/personal_settings',
                name: 'personal_settings',
                component: personalSettings,
            }, {
                path: '/admin/write_article',
                name: 'write_article',
                component: writeArticle,
            }, {
                path: '/admin/manage_category',
                name: 'manage_category',
                component: manageCategory,
            }, {
                path: '/admin/add_category',
                name: 'add_category',
                component: addCategory,
            },
            {
                path: '/admin/manage_tag',
                name: 'manage_tag',
                component: manageTag,
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router