<template>
    <adminFrame title="文章管理"
                width="65%">
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="$router.push('/admin/write_article')">
        </el-button>
        <el-button type="primary"
                   icon="el-icon-delete"
                   @click="delArticle">
        </el-button>
        <el-table class="article-table"
                  :highlight-current-row="true"
                  :data="this.$store.state.article.articleList"
                  v-loading="loading"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             align="center">
            </el-table-column>
            <el-table-column align="center"
                             width="80px"
                             label="评论数">
                <template slot-scope="scope">
                    <el-badge :value="scope.row.comment_count"
                              class="item">
                    </el-badge>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             width="80px"
                             label="访问量">
                <template slot-scope="scope">
                    <el-badge :value="scope.row.pv"
                              class="item">
                    </el-badge>
                </template>
            </el-table-column>
            <el-table-column prop="title"
                             align="center"
                             label="标题">
            </el-table-column>
            <el-table-column align="center"
                             width="80px"
                             label="编辑">
                <template slot-scope="scope">
                    <i class="el-icon-edit edit-button"
                       @click="editArticle(scope.row.aid)"></i>
                </template>
            </el-table-column>
            <el-table-column prop="author_id"
                             align="center"
                             width="80px"
                             label="作者">
            </el-table-column>
            <el-table-column prop=""
                             align="center"
                             label="分类">
                <template slot-scope="scope">
                    <span v-for="item in scope.row.category"
                          :key="item.cid"
                          v-text="item.name"
                          class="article-table-category"></span>
                </template>
            </el-table-column>
            <el-table-column prop="create_date"
                             align="center"
                             width="170px"
                             label="发布日期">
            </el-table-column>
        </el-table>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "manageArticle",
    components: {
        adminFrame
    },
    data() {
        return {
            loading: true,
            selectRows: [],
            filters: [
                { text: "未审核", value: "0" },
                { text: "通过", value: "1" },
                { text: "垃圾", value: "2" }
            ]
        };
    },
    watch: {
        "$store.state.article.articleList": function() {
            this.loading = false;
        }
    },
    mounted() {
        this.getArticleList();
    },
    methods: {
        getArticleList() {
            this.$store.dispatch("getArticleListAction");
        },
        delArticle() {
            if (this.selectRows.length > 0) {
                this.$confirm("此操作将永久删除所选文章, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch(
                            "delArticleAction",
                            this.selectRows
                        );
                        this.loading = true;
                    })
                    .catch(() => {});
            }
        },
        editArticle(aid) {
            this.$router.push({
                path: `/admin/write_article/${aid}`
            });
        },
        handleSelectionChange(rows) {
            let flag = [];
            if (rows) {
                rows.forEach(row => {
                    flag.push(row.aid);
                });
            }
            this.selectRows = flag;
        }
    }
};
</script>

<style scoped>
.article-table {
    width: 100%;
    margin: 20px auto;
}
.edit-button {
    cursor: pointer;
    font-size: 20px;
}
.article-table-category + .article-table-category::before {
    content: " • ";
}
</style>
