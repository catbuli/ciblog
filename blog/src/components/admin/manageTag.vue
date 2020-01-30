<template>
    <adminFrame title="标签管理">
        <el-row>
            <el-col :span="18">sss</el-col>
            <el-col :span="6">sss</el-col>
        </el-row>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "manageTag",
    components: {
        adminFrame
    },
    data() {
        return {
            tagList: [],
            loading: true
        };
    },
    watch: {
        "$store.state.tag.tagList": function() {
            this.tagList = this.$store.state.tag.tagList;
            this.loading = false;
        }
    },
    mounted() {
        this.getCategoryList();
    },
    methods: {
        getCategoryList() {
            this.$store.dispatch("getCategoryListAction");
        }
    }
};
</script>

<style scoped>
</style>
