<template>
    <adminFrame title="分类管理">
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="$router.push('/admin/add_category')">
        </el-button>
        <el-table style="width: 100%">
            <el-table-column prop="date"
                             label="日期"
                             width="180">
            </el-table-column>
            <el-table-column prop="name"
                             label="姓名"
                             width="180">
            </el-table-column>
            <el-table-column prop="address"
                             label="地址">
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
    mounted() {},
    methods: {}
};
</script>

<style scoped>
</style>
