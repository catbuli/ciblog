<template>
    <adminFrame title="分类管理">
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="$router.push('/admin/add_category')">
        </el-button>
        <el-button type="primary"
                   icon="el-icon-delete"
                   @click="delCategory">
        </el-button>
        <el-table class="category-table"
                  :highlight-current-row="true"
                  :data="categoryList"
                  v-loading="loading"
                  @selection-change="handleSelectionChange">
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
            loading: true,
            selectRows: []
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
        },
        delCategory() {
            if (this.selectRows.length > 0) {
                this.$confirm("此操作将永久删除所选分类, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch(
                            "delCategoryAction",
                            this.selectRows
                        );
                        this.loading = true;
                    })
                    .catch(() => {});
            }
        },
        handleSelectionChange(rows) {
            let flag = [];
            if (rows) {
                rows.forEach(row => {
                    flag.push(row.mid);
                });
            }
            this.selectRows = flag;
        }
    }
};
</script>

<style scoped>
.category-table {
    width: 100%;
    margin: 20px auto;
}
</style>
