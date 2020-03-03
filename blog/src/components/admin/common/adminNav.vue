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
                <el-menu-item index="/admin/setup_personal">个人</el-menu-item>
                <!-- <el-menu-item index="/admin/backups">备份</el-menu-item> -->
            </el-submenu>
            <el-menu-item index="/admin/write_article">写文章</el-menu-item>
            <el-submenu index="3">
                <template slot="title">管理</template>
                <el-menu-item index="/admin/manage_article">文章</el-menu-item>
                <el-menu-item index="/admin/manage_comment">评论</el-menu-item>
                <el-menu-item index="/admin/manage_category">分类</el-menu-item>
                <el-menu-item index="/admin/manage_tag">标签</el-menu-item>
                <el-menu-item index="/admin/manage_file">文件</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">设置</template>
                <el-menu-item index="/admin/setup_system">系统设置</el-menu-item>
                <el-menu-item index="/admin/setup_comment">评论设置</el-menu-item>
                <!-- <el-menu-item index="/admin/read_settings">阅读设置</el-menu-item> -->
            </el-submenu>
            <el-menu-item><a :href="$store.state.global.personalData.indexurl"
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
#admin-nav {
    /* width: 100%;
    position: fixed;
    top: 0;
    z-index: -1; */
    /* min-width: 730px; */
}
</style>
