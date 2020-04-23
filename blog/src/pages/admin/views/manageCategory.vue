<template>
    <adminFrame title="分类管理"
                action
                @refresh-click="getCategoryList">
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
            <el-table-column prop="order"
                             align="center"
                             width="50px"
                             label="排序">
            </el-table-column>
            <el-table-column prop="name"
                             align="center"
                             label="名称">
            </el-table-column>
            <el-table-column prop="description"
                             align="center"
                             label="分类描述">
            </el-table-column>
            <el-table-column align="center">
                <template slot-scope="scope">
                    <span class="defaultButton isdefault"
                          v-if="scope.row.mid==defaultCategory">默认</span>
                    <span class="defaultButton"
                          @click="editDefault(scope.row.mid)"
                          v-else>默认</span>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             width="80px"
                             label="操作">
                <template slot-scope="scope">
                    <i class="el-icon-edit operating-button"
                       style="cursor: pointer;font-size:20px"
                       @click="handleDialog(scope.row.mid)"></i>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             label="文章数">
                <template slot-scope="scope">
                    <el-badge :value="scope.row.count"
                              @click.native="jump(scope.row.mid)"
                              style="cursor: pointer;user-select:none"></el-badge>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑分类"
                   :visible.sync="isEdit">
            <el-input placeholder="请输入分类"
                      v-loading="loading"
                      v-model="category.name"></el-input>
            <el-input v-model="category.description"
                      style="margin-top:10px"
                      v-loading="loading"
                      resize="none"
                      type="textarea"
                      placeholder="分类描述!"
                      maxlength="100"
                      show-word-limit
                      :rows=3></el-input>
            <el-button type="primary"
                       style="margin-top:10px"
                       @click="editCategory">保存</el-button>
            <el-button type="info"
                       style="margin-top:10px"
                       @click="isEdit = false">取消</el-button>
        </el-dialog>
    </adminFrame>
</template>

<script>
import adminFrame from "../components/common/adminFrame.vue";
export default {
    name: "manageCategory",
    components: {
        adminFrame
    },
    data() {
        return {
            loading: true,
            selectRows: [],
            isEdit: false,
            category: {}
        };
    },
    computed: {
        categoryList() {
            return this.$store.state.category.categoryList;
        },
        defaultCategory() {
            return this.$store.state.global.system.default_category;
        }
    },
    watch: {
        "$store.state.category.categoryList": function() {
            this.loading = false;
        },
        category: function() {
            this.loading = false;
        }
    },
    created() {
        this.getCategoryList();
    },
    methods: {
        jump(mid) {
            this.$router.push({
                path: `/admin/manage_article`,
                query: {
                    mid: mid
                }
            });
        },
        editDefault(mid) {
            this.$post(
                "/setupc/edit",
                { name: "default_category", value: mid },
                data => {
                    // this.$store.dispatch("getSystemAciton");
                    this.$store.state.global.system.default_category = mid;
                    this.getCategoryList();
                }
            );
        },
        getCategoryList() {
            this.loading = true;
            this.$store.dispatch("getCategoryListAction");
        },
        getCategory(mid) {
            this.loading = true;
            this.$post("/category/bymid", { mid: mid }, data => {
                this.category = data.data;
            });
        },
        editCategory() {
            this.$post("/category/edit", { category: this.category }, data => {
                this.getCategoryList();
            });
            this.isEdit = false;
            this.loading = true;
        },
        handleDialog(mid) {
            this.getCategory(mid);
            this.isEdit = true;
        },
        delCategory() {
            if (this.selectRows.length > 0) {
                this.$confirm(
                    "此操作将永久删除所选分类,以及该分类下所有文章, 是否继续?",
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                    .then(() => {
                        this.$post(
                            "/category/del",
                            { mid: this.selectRows },
                            data => {
                                this.getCategoryList();
                            }
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

<style lang="less" scoped>
.category-table {
    width: 100%;
    margin: 20px auto;
}
.defaultButton {
    cursor: pointer;
    color: rgb(255, 136, 0);
    opacity: 0;
}
.el-table__row:hover .defaultButton {
    /* visibility: visible; */
    opacity: 1;
}
.isdefault {
    cursor: auto;
    opacity: 1;
    color: #606266;
}
</style>
