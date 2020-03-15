<template>
    <adminFrame title="阅读设置">

    </adminFrame>
</template>

<script>
import adminFrame from "@/admin/components/common/adminFrame.vue";
export default {
    name: "readSettings",
    components: {
        adminFrame
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {
        getData() {
            this.$store.dispatch("getCountAction");
        },
        getArticleList() {
            this.$store.dispatch("getArticleListAction");
        },
        getCommentList() {
            this.$store.dispatch("getCommentListAction");
        }
    }
};
</script>

<style scoped>
</style>