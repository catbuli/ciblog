<template>
    <adminFrame title="分类管理">
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="$router.push('/admin/add_category')">
        </el-button>
        <el-table style="width: 100%"
                  :highlight-current-row="true"
                  :data="categoryList"
                  v-loading="loading">
            <el-table-column type="selection"
                             align="center">
            </el-table-column>
            <el-table-column prop="name"
                             align="center"
                             label="名称">
            </el-table-column>
            <el-table-column prop="description"
                             align="center"
                             label="分类描述">
            </el-table-column>
            <el-table-column prop="count"
                             align="center"
                             label="文章数">
            </el-table-column>
        </el-table>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "manageCategory",
    components: {
        adminFrame
    },
    data() {
        return {
            categoryList: [],
            loading: true
        };
    },
    watch: {
        "$store.state.category.categoryList": function() {
            this.categoryList = this.$store.state.category.categoryList;
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
