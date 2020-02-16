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
            <el-table-column width="50px"
                             prop="fid"
                             align="center"
                             label="编号">
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
            <el-table-column prop="aid"
                             width="50px"
                             align="center"
                             label="文章">
            </el-table-column>
            <el-table-column prop="datetime"
                             align="center"
                             label="上传时间">
            </el-table-column>
            <el-table-column prop="url"
                             align="center"
                             width="100px"
                             label="文件链接">
                <template slot-scope="scope">
                    <a :href="$store.state.global.UPLOADPATH +
                    scope.row.url.replace('\\', '/')"
                       target='_blank'>预览</a>
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
        <paging action="getFileListAction"
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
            selectRows: [],
            fileList: [],
            paging: {
                pageSize: 10,
                currentPage: 1,
                type: -1,
                typeName: "all",
                total: 0
            },
            loading: true
        };
    },
    watch: {
        "$store.state.file.fileList": function() {
            this.fileList = this.$store.state.file.fileList;
            this.loading = false;
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
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
            this.$refs.table.toggleRowSelection(row);
        },
        getList() {
            this.$store.dispatch("getFileListAction", this.paging);
        },
        handlePage() {
            this.loading = true;
        },
        handleSelectionChange(rows) {
            console.log(rows);
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
.file-table {
    width: 100%;
    margin: 20px auto;
}
</style>