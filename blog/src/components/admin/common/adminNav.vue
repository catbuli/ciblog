<template>
    <nav id="admin-nav">
        <el-menu class="el-menu-demo"
                 mode="horizontal"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ff8819"
                 router>
            <el-submenu index="1">
                <template slot="title">控制台</template>
                <el-menu-item index="/admin">总览</el-menu-item>
                <el-menu-item index="/admin/personal_settings">个人设置</el-menu-item>
                <el-menu-item index="1-2">备份</el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin/write_article">
                写文章
            </el-menu-item>
            <el-submenu index="3">
                <template slot="title">管理</template>
                <el-menu-item index="/admin/manage_article">文章</el-menu-item>
                <el-menu-item index="/admin/manage_comment">评论</el-menu-item>
                <el-menu-item index="/admin/manage_category">分类</el-menu-item>
                <el-menu-item index="/admin/manage_tag">标签</el-menu-item>
                <el-menu-item index="2-5">文件</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">设置</template>
                <el-menu-item index="/admin/system_settings">系统设置</el-menu-item>
                <el-menu-item index="3-2">评论</el-menu-item>
                <el-menu-item index="3-3">阅读</el-menu-item>
            </el-submenu>
            <el-menu-item><a href="http://localhost:8080/"
                   target="_blank">网站</a></el-menu-item>
            <el-menu-item style="right:0;position:absolute"
                          @click="logout">登出</el-menu-item>
        </el-menu>
    </nav>
</template>

<script>
import Axios from "axios";
export default {
    name: "adminNav",
    data() {
        return {};
    },
    components: {},
    mounted() {},
    watch: {},
    methods: {
        logout() {
            this.$store.dispatch("logoutAction");
        }
    }
};
</script>

<style scoped>
#admin-main {
    width: 100%;
}
</style>
