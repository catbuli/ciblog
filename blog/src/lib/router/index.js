import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    post
} from '@/lib/http';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'home',
        component: (resolve) => require(['@/views/Home.vue'], resolve),
    },
    {
        path: '/search',
        name: 'search',
        component: (resolve) => require(['@/views/Search.vue'], resolve),
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: (resolve) => require(['@/views/Login.vue'], resolve),
        meta: {
            title: '登陆'
        }
    },
    {
        path: '/article/:id',
        name: 'article',
        component: (resolve) => require(['@/views/Article.vue'], resolve)
    },
    {
        path: '/admin',
        name: 'admin',
        component: (resolve) => require(['@/views/Admin.vue'], resolve),
        children: [{
                path: '/admin',
                name: 'index',
                component: (resolve) => require(['@/components/admin/index.vue'], resolve),
                meta: {
                    title: '总览'
                }
            },
            {
                path: '/admin/setup_personal',
                name: 'setup_personal',
                component: (resolve) => require(['@/components/admin/setupPersonal.vue'], resolve),
                meta: {
                    title: '个人设置'
                }
            },
            {
                path: '/admin/write_article',
                name: 'write_article',
                component: (resolve) => require(['@/components/admin/writeArticle.vue'], resolve),
                meta: {
                    title: '写文章'
                }
            },
            {
                path: '/admin/write_article/:aid',
                name: 'edit_article',
                component: (resolve) => require(['@/components/admin/writeArticle.vue'], resolve),
                meta: {
                    title: '修改文章'
                }
            },
            {
                path: '/admin/manage_category',
                name: 'manage_category',
                component: (resolve) => require(['@/components/admin/manageCategory.vue'], resolve),
                meta: {
                    title: '分类管理'
                }
            },
            {
                path: '/admin/add_category',
                name: 'add_category',
                component: (resolve) => require(['@/components/admin/addCategory.vue'], resolve),
                meta: {
                    title: '添加分类'
                }
            },
            {
                path: '/admin/manage_tag',
                name: 'manage_tag',
                component: (resolve) => require(['@/components/admin/manageTag.vue'], resolve),
                meta: {
                    title: '标签管理'
                }
            },
            {
                path: '/admin/manage_article',
                name: 'manage_article',
                component: (resolve) => require(['@/components/admin/manageArticle.vue'], resolve),
                meta: {
                    title: '文章管理'
                }
            },
            {
                path: '/admin/manage_comment',
                name: 'manage_comment',
                component: (resolve) => require(['@/components/admin/manageComment.vue'], resolve),
                meta: {
                    title: '评论管理'
                }
            },
            {
                path: '/admin/setup_system',
                name: 'setup_system',
                component: (resolve) => require(['@/components/admin/setupSystem.vue'], resolve),
                meta: {
                    title: '系统设置'
                }
            },
            {
                path: '/admin/setup_comment',
                name: 'setup_comment',
                component: (resolve) => require(['@/components/admin/setupComment.vue'], resolve),
                meta: {
                    title: '评论设置'
                }
            },
            {
                path: '/admin/read_settings',
                name: 'read_settings',
                component: (resolve) => require(['@/components/admin/readSettings.vue'], resolve),
                meta: {
                    title: '阅读设置'
                }
            },
            {
                path: '/admin/backups',
                name: 'backups',
                component: (resolve) => require(['@/components/admin/backups.vue'], resolve),
                meta: {
                    title: '备份'
                }
            },
            {
                path: '/admin/manage_file',
                name: 'manage_file',
                component: (resolve) => require(['@/components/admin/manageFile.vue'], resolve),
                meta: {
                    title: '文件管理'
                }
            }
        ]
    },
    {
        path: '*',
        name: '404',
        component: (resolve) => require(['@/views/404.vue'], resolve),
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
    if (to.path.indexOf('/admin') == 0) {
        post('/login/check', {}, (data) => {
            if (data.code == 201) {
                next();
            } else {
                next('/login');
            }
        });
    } else if (from.path === '/login') {
        next();
    } else {
        next();
    }
});

export default router;