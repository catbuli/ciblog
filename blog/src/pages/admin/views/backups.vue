<template>
    <adminFrame title="备份">

    </adminFrame>
</template>

<script>
import adminFrame from "../components/common/adminFrame.vue";
export default {
    name: "backups",
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