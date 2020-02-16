<template>
    <adminFrame title="文件管理">
        <el-row>
            <el-col :span=2>
                <el-button type="primary"
                           icon="el-icon-delete"
                           @click="delComment">
                </el-button>
            </el-col>
        </el-row>
        <el-table class="file-table"
                  :highlight-current-row="true"
                  :data="fileList"
                  v-loading="loading"
                  @selection-change="handleSelectionChange"
                  @row-click="clickSelect"
                  ref="table">
            <el-table-column type="selection"
                             align="center"
                             width="50px">
            </el-table-column>
            <el-table-column width="60px"
                             align="center"
                             label="作者">
                <template slot-scope="scope">
                    <el-avatar class="comment-avatar"
                               shape="square"
                               size="large"
                               :src='scope.row.avatar_url'></el-avatar>
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
                        <span @click="editComment(scope.row.cid)">编辑</span>
                        <span>回复</span>
                        <span @click="delComment2(scope.row.cid)">删除</span>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <paging action="getCommentListAction"
                align="right"
                @function="handlePage"></paging>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
import paging from "@/components/common/paging.vue";

export default {
    name: "manageFile",
    components: {
        adminFrame,
        paging
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
                type: 0,
                typeName: "status",
                total: 0
            }
        };
    },
    watch: {},
    mounted() {},
    methods: {}
};
</script>

<style scoped>
.file-table {
    width: 100%;
    margin: 20px auto;
}
</style>