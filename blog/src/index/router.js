import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    post
} from '@/lib/http';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'home',
        component: (resolve) => require(['@/index/views/Home.vue'], resolve),
    },
    {
        path: '/search',
        name: 'search',
        component: (resolve) => require(['@/index/views/Search.vue'], resolve),
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/article/:id',
        name: 'article',
        component: (resolve) => require(['@/index/views/Article.vue'], resolve)
    },
    {
        path: '*',
        name: '404',
        component: (resolve) => require(['@/index/views/404.vue'], resolve),
        meta: {
            title: '页面逃走了'
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    // mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;