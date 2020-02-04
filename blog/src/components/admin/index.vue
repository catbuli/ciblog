<template>
    <adminFrame title="总览">
        <h1>一共篇<span class="sign">{{$store.state.global.countList.articleCount}}</span>文章,<span class="sign">{{$store.state.global.countList.categoryCount}}</span>种分类,<span class="sign">{{$store.state.global.countList.commentCount}}</span>条评论</h1>
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
    color: dimgrey;
}
</style>