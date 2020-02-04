<template>
    <adminFrame title="总览">
        <div class="index-top">
            <h1>一共篇<span class="sign">{{$store.state.global.countList.articleCount}}</span>文章,<span class="sign">{{$store.state.global.countList.categoryCount}}</span>种分类,<span class="sign">{{$store.state.global.countList.commentCount}}</span>条评论</h1>
            <p>
                <router-link to="/admin/write_article">写文章</router-link>
                <router-link to="/admin/manage_article">文章管理</router-link>
                <router-link to="/admin/personal_settings">个人设置</router-link>
                <router-link to="/admin/system_settings">系统设置</router-link>
            </p>
        </div>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "index",
    components: {
        adminFrame
    },
    data() {
        return {};
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$store.dispatch("getCountAction");
        }
    }
};
</script>

<style scoped>
.sign {
    font-size: 60px;
    color: #ff7b00;
}
.index-top p a {
    margin-right: 20px;
}
</style>