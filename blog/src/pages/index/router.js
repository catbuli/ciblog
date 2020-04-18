import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    post
} from '@/lib/http';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "index-group" */ './views/Home.vue')
    },
    {
        path: '/search/:typeName/:type',
        name: 'search',
        component: () => import( /* webpackChunkName: "index-group" */ './views/Search.vue'),
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/article/:id',
        name: 'article',
        component: () => import( /* webpackChunkName: "index-group" */ './views/Article.vue')
    },
    {
        path: '/log',
        name: 'log',
        component: () => import( /* webpackChunkName: "index-group" */ './views/Log.vue'),
        meta: {
            title: '归档'
        }
    },
    {
        path: '*',
        name: '404',
        component: () => import( /* webpackChunkName: "index-group" */ './views/404.vue'),
        meta: {
            title: '页面逃走了'
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    // mode: 'hash',
    base: process.env.BASE_URL,
    routes,
    // scrollBehavior(to, from, savedPosition) {
    //     return {
    //         x: 0,
    //         y: 0
    //     }
    // }
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});


export default router;