<template>
    <adminFrame title="文件">

    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "manageFile",
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