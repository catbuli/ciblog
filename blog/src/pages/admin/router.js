import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    post
} from '@/lib/http';

Vue.use(VueRouter);

const routes = [{
        path: '/admin',
        name: 'index',
        component: (resolve) => require(['./views/index.vue'], resolve),
        meta: {
            title: '总览'
        }
    },
    {
        path: '/admin/login',
        name: 'login',
        component: (resolve) => require(['./views/Login.vue'], resolve),
        meta: {
            title: '登陆'
        }
    },
    {
        path: '/admin/setup_personal',
        name: 'setup_personal',
        component: (resolve) => require(['./views/setupPersonal.vue'], resolve),
        meta: {
            title: '个人设置'
        }
    },
    {
        path: '/admin/write_article',
        name: 'write_article',
        component: (resolve) => require(['./views/writeArticle.vue'], resolve),
        meta: {
            title: '写文章'
        }
    },
    {
        path: '/admin/write_article/:aid',
        name: 'edit_article',
        component: (resolve) => require(['./views/writeArticle.vue'], resolve),
        meta: {
            title: '修改文章'
        }
    },
    {
        path: '/admin/manage_category',
        name: 'manage_category',
        component: (resolve) => require(['./views/manageCategory.vue'], resolve),
        meta: {
            title: '分类管理'
        }
    },
    {
        path: '/admin/add_category',
        name: 'add_category',
        component: (resolve) => require(['./views/addCategory.vue'], resolve),
        meta: {
            title: '添加分类'
        }
    },
    {
        path: '/admin/manage_tag',
        name: 'manage_tag',
        component: (resolve) => require(['./views/manageTag.vue'], resolve),
        meta: {
            title: '标签管理'
        }
    },
    {
        path: '/admin/manage_article',
        name: 'manage_article',
        component: (resolve) => require(['./views/manageArticle.vue'], resolve),
        meta: {
            title: '文章管理'
        }
    },
    {
        path: '/admin/manage_comment',
        name: 'manage_comment',
        component: (resolve) => require(['./views/manageComment.vue'], resolve),
        meta: {
            title: '评论管理'
        }
    },
    {
        path: '/admin/setup_system',
        name: 'setup_system',
        component: (resolve) => require(['./views/setupSystem.vue'], resolve),
        meta: {
            title: '系统设置'
        }
    },
    {
        path: '/admin/setup_comment',
        name: 'setup_comment',
        component: (resolve) => require(['./views/setupComment.vue'], resolve),
        meta: {
            title: '评论设置'
        }
    },
    {
        path: '/admin/read_settings',
        name: 'read_settings',
        component: (resolve) => require(['./views/readSettings.vue'], resolve),
        meta: {
            title: '阅读设置'
        }
    },
    {
        path: '/admin/backups',
        name: 'backups',
        component: (resolve) => require(['./views/backups.vue'], resolve),
        meta: {
            title: '备份'
        }
    },
    {
        path: '/admin/manage_file',
        name: 'manage_file',
        component: (resolve) => require(['./views/manageFile.vue'], resolve),
        meta: {
            title: '文件管理'
        }
    },
    {
        path: '*',
        name: 'index',
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
    if (to.path == "/admin.html") {
        next("/admin/");
    }
    if (to.path == "/admin/login") {
        next();
    } else {
        post('/login/check', {}, (data) => {
            if (data.code == 201) {
                next();
            } else {
                next("/admin/login");
            }
        });
    }
});

export default router;