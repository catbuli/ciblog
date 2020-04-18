<template>
    <nav id="admin-nav">
        <el-menu class="el-menu-demo"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ff8819"
                 mode="horizontal"
                 router>
            <el-submenu index="1">
                <template slot="title">控制台</template>
                <el-menu-item index="/admin/">总览</el-menu-item>
                <el-menu-item index="/admin/setup_personal">个人</el-menu-item>
                <el-menu-item index="/admin/backups">备份</el-menu-item>
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
                <el-menu-item index="/admin/setup_read">阅读设置</el-menu-item>
            </el-submenu>
            <el-menu-item><a :href="$store.state.global.system.web_url"
                   target="_blank">网站</a></el-menu-item>
            <!-- <el-menu-item style="right:0;position:absolute"
                          @click="logout">登出</el-menu-item>
            <el-menu-item index="/admin/setup_personal"
                          style="right:100px;position:absolute;user-select:none">当前账户：{{name}}</el-menu-item> -->
            <el-menu-item index="/admin/setup_personal">当前账户：{{name}}</el-menu-item>
            <el-menu-item @click="logout">登出</el-menu-item>
        </el-menu>
    </nav>
</template>

<script>
export default {
    name: "adminNav",
    data() {
        return {};
    },
    components: {},
    mounted() {},
    created() {
        this.$store.dispatch("getCountAction");
        this.$store.dispatch("getSystemAciton");
        this.$store.dispatch("getPersonalDataAction");
    },
    computed: {
        name() {
            return this.$store.state.global.personalData.name;
        }
    },
    watch: {},
    methods: {
        logout() {
            this.$store.dispatch("logoutAction");
        }
    }
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 480px) {
} /* 超小设备（手机，小于 480px） */
#admin-nav {
    width: 100%;
    position: absolute;
}
</style>
