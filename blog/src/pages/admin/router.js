import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    post
} from '@/lib/http';

Vue.use(VueRouter);

const routes = [{
        path: '/admin',
        name: 'index',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/index.vue'),
        meta: {
            title: '总览'
        }
    },
    {
        path: '/admin/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/Login.vue'),
        meta: {
            title: '登陆'
        }
    },
    {
        path: '/admin/setup_personal',
        name: 'setup_personal',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/setupPersonal.vue'),
        meta: {
            title: '个人设置'
        }
    },
    {
        path: '/admin/write_article',
        name: 'write_article',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/writeArticle.vue'),
        meta: {
            title: '写文章'
        }
    },
    {
        path: '/admin/write_article/:aid',
        name: 'edit_article',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/writeArticle.vue'),
        meta: {
            title: '修改文章'
        }
    },
    {
        path: '/admin/manage_category',
        name: 'manage_category',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/manageCategory.vue'),
        meta: {
            title: '分类管理'
        }
    },
    {
        path: '/admin/add_category',
        name: 'add_category',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/addCategory.vue'),
        meta: {
            title: '添加分类'
        }
    },
    {
        path: '/admin/manage_tag',
        name: 'manage_tag',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/manageTag.vue'),
        meta: {
            title: '标签管理'
        }
    },
    {
        path: '/admin/manage_article',
        name: 'manage_article',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/manageArticle.vue'),
        meta: {
            title: '文章管理'
        }
    },
    {
        path: '/admin/manage_comment',
        name: 'manage_comment',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/manageComment.vue'),
        meta: {
            title: '评论管理'
        }
    },
    {
        path: '/admin/setup_system',
        name: 'setup_system',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/setupSystem.vue'),
        meta: {
            title: '系统设置'
        }
    },
    {
        path: '/admin/setup_comment',
        name: 'setup_comment',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/setupComment.vue'),
        meta: {
            title: '评论设置'
        }
    },
    {
        path: '/admin/read_settings',
        name: 'read_settings',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/readSettings.vue'),
        meta: {
            title: '阅读设置'
        }
    },
    {
        path: '/admin/backups',
        name: 'backups',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/backups.vue'),
        meta: {
            title: '备份'
        }
    },
    {
        path: '/admin/manage_file',
        name: 'manage_file',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/manageFile.vue'),
        meta: {
            title: '文件管理'
        }
    },
    {
        path: '/admin/backups',
        name: 'backups',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/backups.vue'),
        meta: {
            title: '备份'
        }
    },
    {
        path: '*',
        name: '/admin/',
        component: () => import( /* webpackChunkName: "admin-group" */ './views/index.vue'),
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
    if (to.path == "/admin/login") {
        next();
    } else {
        if (to.path.indexOf("admin") != -1) {
            post('/login/check', {}, (data) => {
                if (data.code == 201) {
                    next();
                } else {
                    next("/admin/login");
                }
            });
        }
        next();
    }
});

export default router;