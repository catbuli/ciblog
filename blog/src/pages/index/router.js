import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    post
} from '@/lib/http';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'home',
        component: (resolve) => require(['./views/Home.vue'], resolve),
    },
    {
        path: '/search/:typeName/:type',
        name: 'search',
        component: (resolve) => require(['./views/Search.vue'], resolve),
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/article/:id',
        name: 'article',
        component: (resolve) => require(['./views/Article.vue'], resolve)
    },
    {
        path: '/log',
        name: 'log',
        component: (resolve) => require(['./views/Log.vue'], resolve),
        meta: {
            title: '归档'
        }
    },
    {
        path: '*',
        name: '404',
        component: (resolve) => require(['./views/404.vue'], resolve),
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