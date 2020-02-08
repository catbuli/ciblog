<template>
    <adminFrame title="评论管理">
        <el-button type="primary"
                   icon="el-icon-delete"
                   @click="delComment">
        </el-button>
        <el-table class="comment-table"
                  :highlight-current-row="true"
                  :data="commentList"
                  v-loading="loading"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             align="center"
                             width="50px">
            </el-table-column>
            <el-table-column width="200px"
                             label="作者">
                <template slot-scope="scope">
                    <p v-text="scope.row.nickname"></p>
                    <p v-text="scope.row.email"></p>
                    <p v-text="scope.row.ip"></p>
                </template>
            </el-table-column>
            <el-table-column label="内容"
                             :filters="filters"
                             :filter-method="filterHandler"
                             :filter-multiple=false
                             filter-placement="bottom-start"
                             prop="status">
                <template slot-scope="scope">
                    <p class="content-table-top">{{scope.row.create_date}}　评论于　<a :href="'/article/'+scope.row.aid">{{scope.row.title}}</a> </p>
                    <p class="content-table-middle"
                       v-text="scope.row.content"></p>
                    <p class="content-table-bottom"
                       v-if="scope.row.status===0">
                        <span @click="editCommentStatus(scope.row.cid,1)">通过</span>
                        <span class="select">待审核</span>
                        <span @click="editCommentStatus(scope.row.cid,2)">垃圾</span>
                        <span @click="editComment(scope.row.cid)">编辑</span>
                        <span>回复</span>
                        <span @click="delComment2(scope.row.cid)">删除</span>
                    </p>
                    <p class="content-table-bottom"
                       v-else-if="scope.row.status===1">
                        <span class="select">通过</span>
                        <span @click="editCommentStatus(scope.row.cid,0)">待审核</span>
                        <span @click="editCommentStatus(scope.row.cid,2)">垃圾</span>
                        <span @click="editComment(scope.row.cid)">编辑</span>
                        <span>回复</span>
                        <span @click="delComment2(scope.row.cid)">删除</span>
                    </p>
                    <p class="content-table-bottom"
                       v-else>
                        <span @click="editCommentStatus(scope.row.cid,1)">通过</span>
                        <span @click="editCommentStatus(scope.row.cid,0)">待审核</span>
                        <span class="select">垃圾</span>
                        <span @click="editComment(scope.row.cid)">编辑</span>
                        <span>回复</span>
                        <span @click="delComment2(scope.row.cid)">删除</span>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background
                       layout="jumper,prev,pager,next,total"
                       :total="paging.total"
                       :page-size="paging.pageSize"
                       style="text-align:right"
                       @current-change="currentChange">
        </el-pagination>
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
            commentList: [],
            loading: true,
            selectRows: [],
            isEdit: false,
            content: "",
            filters: [
                { text: "未审核", value: 0 },
                { text: "通过", value: 1 },
                { text: "垃圾", value: 2 }
            ],
            paging: {
                pageSize: 10,
                currentPage: 1,
                type: -1,
                total: 0
            }
        };
    },
    watch: {
        "$store.state.comment.commentList": function() {
            this.commentList = this.$store.state.comment.commentList;
            this.loading = false;
        },
        "$store.state.comment.paging": function() {
            this.paging = this.$store.state.comment.paging;
            this.loading = false;
        }
    },
    mounted() {
        this.getCommentList();
    },
    methods: {
        getCommentList() {
            this.loading = true;
            this.$store.dispatch("getCommentListAction", this.paging);
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
        delComment2(cid) {
            this.$store.dispatch("delCommentAction", cid);
        },
        handleSelectionChange(rows) {
            let flag = [];
            if (rows) {
                rows.forEach(row => {
                    flag.push(row.cid);
                });
            }
            this.selectRows = flag;
        },
        editCommentStatus(cid, status) {
            this.$store.dispatch("editCommentStatusAction", {
                cid: cid,
                status: status
            });
        },
        editComment(cid) {
            // this.isEdit = true;
        },
        filterHandler(value, row, column) {
            return row.status === value;
        },
        currentChange(e) {
            this.paging.currentPage = e;
            this.getCommentList();
        }
    }
};
</script>

<style scoped>
.comment-table {
    width: 100%;
    margin: 20px auto;
}
.content-table-middle {
    margin: 10px auto;
}
.content-table-edit {
}
.content-table-bottom span {
    margin-right: 10px;
    cursor: pointer;
}
.content-table-bottom
    span:nth-of-type(1)
    .content-table-bottom
    span:nth-of-type(2)
    .content-table-bottom
    span:nth-of-type(3) {
    color: rgb(59, 59, 59);
}
.content-table-bottom span:nth-of-type(4) {
    color: green;
}
.content-table-bottom span:nth-of-type(5) {
    color: black;
}
.content-table-bottom span:nth-of-type(6) {
    color: red;
}
.select {
    border: 2px dashed #ff7b00;
    padding: 2px;
    cursor: default !important;
}
</style>
