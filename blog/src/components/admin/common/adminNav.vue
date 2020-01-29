<template>
    <nav id="admin-nav">
        <el-menu class="el-menu-demo"
                 mode="horizontal"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router>
            <el-submenu index>
                <template slot="title">控制台</template>
                <el-menu-item index="/admin">个人设置</el-menu-item>
                <el-menu-item index="1-2">备份</el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin/write_post">
                写文章
            </el-menu-item>
            <el-submenu index="3">
                <template slot="title">管理</template>
                <el-menu-item index="2-1">文章</el-menu-item>
                <el-menu-item index="2-2">评论</el-menu-item>
                <el-menu-item index="2-3">分类</el-menu-item>
                <el-menu-item index="2-4">标签</el-menu-item>
                <el-menu-item index="2-5">文件</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">设置</template>
                <el-menu-item index="3-1">基本</el-menu-item>
                <el-menu-item index="3-2">评论</el-menu-item>
                <el-menu-item index="3-3">阅读</el-menu-item>
            </el-submenu>
            <el-menu-item index="5">网站</el-menu-item>
            <!-- <el-menu-item index="6"
                          style="right:0;position:absolute">登出</el-menu-item> -->
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
        getMessage() {
            Axios.post("/api/api/client")
                .then(res => {
                    this.name = res.data.name;
                    this.imgURL = res.data.imgURL;
                    this.bilibili = res.data.bilibili;
                    this.github = res.data.github;
                    this.email = res.data.email;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
#admin-main {
    width: 100%;
}
</style>
