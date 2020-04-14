<template>
    <adminFrame title="文件管理"
                action
                @refresh-click="getData"
                width="70%">
        <el-row>
            <el-col :span="style.isPC?2:4">
                <el-button type="primary"
                           icon="el-icon-delete"
                           @click="delComment">
                </el-button>
            </el-col>
            <el-col :span="style.isPC?14:20">
                <el-radio-group v-model="paging.type"
                                @change="selectChange">
                    <el-radio-button label=-1>全部</el-radio-button>
                    <el-radio-button label=0>归档</el-radio-button>
                    <el-radio-button label=1>临时</el-radio-button>
                    <el-radio-button label=2>全局</el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :span="style.isPC?3:24"
                    :offset="style.isPC?5:0"
                    class="upload">
                <el-upload multiple
                           :style="{'text-align':style.isPC?'right':'left'}"
                           action="#"
                           :http-request="upload"
                           :file-list="fileList">
                    <el-button type="primary">点击上传</el-button>
                    <!-- <div slot="tip"
                         class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
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
            <el-table-column width="100px"
                             prop="type"
                             align="center"
                             label="文件类型">
            </el-table-column>
            <el-table-column prop="size"
                             width="100px"
                             align="center"
                             label="文件大小">
                <template slot-scope="scope">
                    <span>{{(scope.row.size/1024).toFixed(2)+'kb'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name"
                             align="center"
                             label="文件名称">
            </el-table-column>
            <el-table-column prop="name"
                             align="center"
                             label="文件链接"
                             width="100px">
                <template slot-scope="scope">
                    <a style="cursor: pointer;color: orange;"
                       @click="selectFile(scope.row.url)">文件链接</a>
                </template>
            </el-table-column>
            <el-table-column prop="aid"
                             width="50px"
                             align="center"
                             label="所属">
            </el-table-column>
            <el-table-column prop="status"
                             align="center"
                             label="归档类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.status==0">归档文件</span>
                    <span v-else-if="scope.row.status==1">临时文件</span>
                    <span v-else>全局文件</span>
                </template>
            </el-table-column>
            <el-table-column prop="datetime"
                             align="center"
                             label="上传时间"
                             width="100px">
            </el-table-column>
            <el-table-column prop="url"
                             align="center"
                             width="139px"
                             label="预览">
                <template slot-scope="scope">
                    <el-image style="width: 100px; height: 70px"
                              :src="scope.row.url"
                              :preview-src-list="[scope.row.url]">
                    </el-image>
                </template>
            </el-table-column>
            <!-- <el-table-column>
                <template slot-scope="scope">
                    <p v-text="scope.row.nickname"></p>
                    <p v-text="scope.row.email"></p>
                    <p v-text="scope.row.ip"></p>
                </template>
            </el-table-column> -->
        </el-table>
        <el-dialog title="文章链接"
                   width="30%"
                   multiple
                   :visible.sync="isEdit">
            <el-input placeholder="链接地址"
                      ref="url"
                      v-model="url"></el-input>
            <el-button type="primary"
                       style="margin-top:10px"
                       @click="copy">复制</el-button>
            <el-button type="info"
                       style="margin-top:10px"
                       @click="isEdit = false">关闭</el-button>
        </el-dialog>
        <paging action="getFileListAction"
                :paging="paging"
                align="right"
                @function="handlePage"></paging>
    </adminFrame>
</template>

<script>
import adminFrame from "../components/common/adminFrame.vue";
import paging from "@/components/common/paging.vue";

export default {
    name: "manageFile",
    components: {
        adminFrame,
        paging
    },
    data() {
        return {
            selectRows: [],
            paging: {
                pageSize: 10,
                currentPage: 1,
                type: -1,
                typeName: "status",
                total: 0
            },
            loading: true,
            isEdit: false,
            url: ""
        };
    },
    watch: {
        "$store.state.file.fileList": function() {
            this.loading = false;
        }
    },
    computed: {
        style() {
            return this.$store.getters.globalStyle;
        },
        fileList() {
            return this.$store.state.file.fileList;
        }
    },
    mounted() {},
    methods: {
        getData() {
            this.loading = true;
            this.$store.dispatch("getFileListAction", this.paging);
        },
        /**
         * 覆盖组件
         */
        upload(val) {
            let fd = new FormData();
            fd.append("image", val.file);
            fd.append("aid", -2);
            this.$post("/upload/add", fd, data => {
                this.$store.dispatch("getFileListAction", this.paging);
            });
        },
        selectFile(url) {
            this.url = url;
            this.isEdit = true;
        },
        copy() {
            let url = this.$refs.url;
            url.select();
            document.execCommand("Copy");
            this.$message({
                type: "success",
                message: "链接复制成功！",
                effect: "dark"
            });
            this.isEdit = false;
        },
        selectChange(value) {
            this.loading = true;
            this.paging.currentPage = 1;
            this.paging.type = value;
            this.$store.dispatch("getFileListAction", this.paging);
        },
        delComment() {
            if (this.selectRows.length > 0) {
                this.$confirm("此操作将永久删除所选文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch("delFileAction", this.selectRows);
                        this.loading = true;
                    })
                    .catch(() => {});
            }
        },
        clickSelect(row, column, event) {
            // this.$refs.table.toggleRowSelection(row);
        },
        handlePage() {
            this.loading = true;
        },
        handleSelectionChange(rows) {
            let flag = [];
            if (rows) {
                rows.forEach(row => {
                    flag.push(row.fid);
                });
            }
            this.selectRows = flag;
        }
    }
};
</script>

<style scoped>
@transition: ~"all 1s ease";
@media screen and (max-width: 960px) {
    .el-col {
        margin: 5px auto;
    }
} /* 超小设备（手机，小于 480px） */
.file-table {
    width: 100%;
    margin: 20px auto;
}
.upload >>> .el-upload-list {
    display: none;
}
</style>