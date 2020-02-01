<template>
    <adminFrame title="评论管理">
        <el-button type="primary"
                   icon="el-icon-delete"
                   @click="delComment">
        </el-button>
        <el-table class="comment-table"
                  :highlight-current-row="true"
                  :data="this.$store.state.comment.commentList"
                  v-loading="loading"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             align="center"
                             width="100px">
            </el-table-column>
            <el-table-column width="200px"
                             label="作者">
                <template slot-scope="scope">
                    <p v-text="scope.row.nickname"></p>
                    <p v-text="scope.row.email"></p>
                    <p v-text="scope.row.ip"></p>
                </template>
            </el-table-column>
            <el-table-column label="内容">
                <template slot-scope="scope">
                    <p v-text="scope.row.content"></p>
                    <a href="">ddd</a>
                </template>
            </el-table-column>
        </el-table>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "manageComment",
    components: {
        adminFrame
    },
    data() {
        return {
            loading: true,
            selectRows: []
        };
    },
    watch: {
        "$store.state.comment.commentList": function() {
            this.loading = false;
        }
    },
    mounted() {
        this.getCommentList();
    },
    methods: {
        getCommentList() {
            this.$store.dispatch("getCommentListAction");
        },
        delComment() {
            if (this.selectRows.length > 0) {
                this.$confirm("此操作将永久删除所选分类, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch(
                            "delCommentAction",
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
.comment-table {
    width: 100%;
    margin: 20px auto;
}
</style>
