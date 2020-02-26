import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Article from '@/views/Article.vue'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin.vue'
import errorPage from '@/views/404.vue'
import Search from '@/views/Search.vue'
import personalSettings from '@/components/admin/personalSettings.vue'
import writeArticle from '@/components/admin/writeArticle.vue'
import manageArticle from '@/components/admin/manageArticle.vue'
import manageCategory from '@/components/admin/manageCategory.vue'
import addCategory from '@/components/admin/addCategory.vue'
import manageTag from '@/components/admin/manageTag.vue'
import index from '@/components/admin/index.vue'
import manageComment from '@/components/admin/manageComment.vue'
import setupSystem from '@/components/admin/setupSystem.vue'
import backups from '@/components/admin/backups.vue'
import readSettings from '@/components/admin/readSettings.vue'
import commentSettings from '@/components/admin/commentSettings.vue'
import manageFile from '@/components/admin/manageFile.vue'
import {
    post
} from "@/lib/http"

Vue.use(VueRouter)


const routes = [{
    path: '/',
    name: 'home',
    component: Home,
}, {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
        title: '搜索'
    },
}, {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
        title: '登陆'
    },
}, {
    path: '/article/:id',
    name: 'article',
    component: Article
}, {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [{
        path: '/admin',
        name: 'index',
        component: index,
        meta: {
            title: '总览'
        },
    }, {
        path: '/admin/personal_settings',
        name: 'personal_settings',
        component: personalSettings,
        meta: {
            title: '个人设置'
        },
    }, {
        path: '/admin/write_article',
        name: 'write_article',
        component: writeArticle,
        meta: {
            title: '写文章'
        },
    }, {
        path: '/admin/write_article/:aid',
        name: 'edit_article',
        component: writeArticle,
        meta: {
            title: '修改文章'
        },
    }, {
        path: '/admin/manage_category',
        name: 'manage_category',
        component: manageCategory,
        meta: {
            title: '分类管理'
        },
    }, {
        path: '/admin/add_category',
        name: 'add_category',
        component: addCategory,
        meta: {
            title: '添加分类'
        },
    }, {
        path: '/admin/manage_tag',
        name: 'manage_tag',
        component: manageTag,
        meta: {
            title: '标签管理'
        },
    }, {
        path: '/admin/manage_article',
        name: 'manage_article',
        component: manageArticle,
        meta: {
            title: '文章管理'
        },
    }, {
        path: '/admin/manage_comment',
        name: 'manage_comment',
        component: manageComment,
        meta: {
            title: '评论管理'
        },
    }, {
        path: '/admin/setup_system',
        name: 'setup_system',
        component: setupSystem,
        meta: {
            title: '系统设置'
        },
    }, {
        path: '/admin/read_settings',
        name: 'read_settings',
        component: readSettings,
        meta: {
            title: '阅读设置'
        },
    }, {
        path: '/admin/backups',
        name: 'backups',
        component: backups,
        meta: {
            title: '备份'
        },
    }, {
        path: '/admin/comment_settings',
        name: 'comment_settings',
        component: commentSettings,
        meta: {
            title: '评论设置'
        },
    }, {
        path: '/admin/manage_file',
        name: 'manage_file',
        component: manageFile,
        meta: {
            title: '文件管理'
        },
    }]
}, {
    path: '/404',
    name: '404',
    component: errorPage,
    meta: {
        title: '页面逃走了'
    },
}]

const router = new VueRouter({
    mode: 'history',
    // mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.path.indexOf("/admin") == 0) {
        post("/login/check", {}, (data) => {
            if (data.code == 201) {
                next();
            } else {
                next('/login');
            }
        })
    } else if (from.path === '/login') {
        next();
    } else {
        next();
    }
});

export default router