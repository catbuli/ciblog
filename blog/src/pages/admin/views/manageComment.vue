<template>
    <adminFrame title="评论管理"
                action
                @refresh-click="getData">
        <el-row>
            <el-col :span=2>
                <el-button type="primary"
                           icon="el-icon-delete"
                           @click="delComment">
                </el-button>
            </el-col>
            <el-col :span=12>
                <el-radio-group v-model="paging.type"
                                @change="selectChange">
                    <el-radio-button label=-1>全部</el-radio-button>
                    <el-radio-button label=1>通过</el-radio-button>
                    <el-radio-button label=0>待审核</el-radio-button>
                    <el-radio-button label=2>垃圾</el-radio-button>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-table class="comment-table"
                  :highlight-current-row="true"
                  :data="commentList"
                  v-loading="loading"
                  @selection-change="handleSelectionChange"
                  @row-click="clickSelect"
                  ref="table">
            <el-table-column type="selection"
                             align="center"
                             width="50px">
            </el-table-column>
            <el-table-column width="50px"
                             prop="cid"
                             align="center"
                             label="评论id">
            </el-table-column>
            <el-table-column width="60px"
                             align="center"
                             label="作者">
                <template slot-scope="scope">
                    <Gravatar :email="scope.row.email"
                              class="comment-avatar"
                              :size="50"></Gravatar>
                </template>
            </el-table-column>
            <el-table-column width="200px">
                <template slot-scope="scope">
                    <p v-text="scope.row.nickname"></p>
                    <p v-text="scope.row.email"></p>
                    <p v-text="scope.row.ip"></p>
                </template>
            </el-table-column>
            <el-table-column label="内容"
                             prop="status">
                <template slot-scope="scope">
                    <p class="content-table-top">{{scope.row.create_date}}　评论于　<a :href="'/article/'+scope.row.aid">{{scope.row.title}}</a> </p>
                    <p class="content-table-middle"
                       v-text="scope.row.content"></p>
                    <p class="content-table-bottom">
                        <el-radio-group v-model="scope.row.status"
                                        size="mini"
                                        @change="(label)=>{editCommentStatus(label,scope.row.cid)}">
                            <!-- 博客 ↑ -->
                            <el-radio-button label=1>通过</el-radio-button>
                            <el-radio-button label=0>待审核</el-radio-button>
                            <el-radio-button label=2>垃圾</el-radio-button>
                        </el-radio-group>
                        <span @click="handleDialog(scope.row.cid)">编辑</span>
                        <span @click="handleReplyDialog(scope.row.aid,scope.row.cid,scope.row.nickname)">回复</span>
                        <span @click="delComment2(scope.row.cid)">删除</span>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <paging action="getCommentListAction"
                align="right"
                :paging="paging"
                @function="handlePage"></paging>
        <el-dialog title="编辑评论"
                   :visible.sync="isEdit">
            <el-input v-model="comment.content"
                      resize="none"
                      type="textarea"
                      placeholder="文明留言哦!"
                      maxlength="200"
                      show-word-limit
                      :rows=5></el-input>
            <el-button type="primary"
                       style="margin-top:10px"
                       @click="editComment">保存</el-button>
            <el-button type="info"
                       style="margin-top:10px"
                       @click="isEdit = false">取消</el-button>
        </el-dialog>
        <el-dialog title="回复评论"
                   :visible.sync="isReply">
            <el-input v-model="comment.content"
                      resize="none"
                      type="textarea"
                      maxlength="200"
                      show-word-limit
                      :rows=5></el-input>
            <el-button type="primary"
                       style="margin-top:10px"
                       @click="replyComment()">回复</el-button>
            <el-button type="info"
                       style="margin-top:10px"
                       @click="isReply = false">取消</el-button>
        </el-dialog>
    </adminFrame>
</template>

<script>
import adminFrame from "../components/common/adminFrame.vue";
import paging from "@/components/common/paging.vue";
import Gravatar from "vue-gravatar";
export default {
    name: "manageComment",
    components: {
        adminFrame,
        paging,
        Gravatar
    },
    data() {
        return {
            comment: {},
            commentList: [],
            loading: true,
            selectRows: [],
            isEdit: false,
            isReply: false,
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
                typeName: "status",
                total: 0
            }
        };
    },
    watch: {
        "$store.state.comment.commentList": function() {
            this.commentList = this.$store.state.comment.commentList;
            this.loading = false;
        },
        "$store.state.comment.comment": function() {
            this.comment = this.$store.state.comment.comment;
            this.loading = false;
        }
    },
    mounted() {},
    methods: {
        getData() {
            this.loading = true;
            this.$store.dispatch("getCommentListAction", this.paging);
        },
        selectChange(value) {
            this.loading = true;
            this.paging.currentPage = 1;
            this.paging.type = value;
            this.paging.typeName = "status";
            this.$store.dispatch("getCommentListAction", this.paging);
        },
        delComment() {
            if (this.selectRows.length > 0) {
                this.$confirm("此操作将永久删除所选评论, 是否继续?", "提示", {
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
        editCommentStatus(label, cid) {
            this.$store.dispatch("editCommentStatusAction", {
                cid: cid,
                status: label
            });
        },
        handleDialog(cid) {
            this.isEdit = true;
            this.$store.dispatch("getCommentAction", cid);
        },
        handleReplyDialog(aid, cid, nickname) {
            this.isReply = true;
            this.comment = {
                aid: aid,
                content: "",
                nickname: this.$store.state.global.system.web_name,
                email: this.$store.state.global.personalData.mail,
                reply: {
                    cid: cid,
                    nickname: nickname
                },
                avatar_url: this.$store.state.global.personalData.imgurl
            };
        },
        replyComment() {
            this.$store.dispatch("addCommentAction", this.comment);
            this.isReply = false;
        },
        editComment() {
            this.$store.dispatch("editCommentAction", this.comment);
            this.isEdit = false;
            this.loading = true;
        },
        // 博客↓
        clickSelect(row, column, event) {
            this.$refs.table.toggleRowSelection(row);
        },
        handlePage() {
            this.loading = true;
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
.el-table__row:hover .content-table-bottom {
    /* visibility: visible; */
    opacity: 1;
}
.content-table-bottom {
    /* visibility: hidden; */
    opacity: 0;
}
.content-table-bottom span {
    margin-right: 10px;
    cursor: pointer;
}
.content-table-bottom span:nth-of-type(1) {
    color: green;
}
.content-table-bottom span:nth-of-type(2) {
    color: black;
}
.content-table-bottom span:nth-of-type(3) {
    color: red;
}
.content-table-bottom .el-radio-group {
    margin-right: 20px;
}
.select {
    border: 2px dashed #ff7b00;
    padding: 2px;
    cursor: default !important;
}
.comment-avatar {
    border-radius: 7px;
}
</style>
