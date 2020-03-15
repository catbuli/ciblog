<template>
    <div id="upload">
        <el-upload multiple
                   action="#"
                   :on-preview="selectFile"
                   :on-remove="delFile"
                   :on-success="uploadSuccess"
                   :http-request="upload"
                   :file-list="fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog title="编辑评论"
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
    </div>
</template>

<script>
export default {
    name: "upload",
    data() {
        return {
            fileList: [],
            file: {},
            paging: {
                pageSize: 10,
                currentPage: 1,
                type: 1,
                typeName: "status",
                total: 0
            },
            loading: true,
            isEdit: false,
            url: ""
        };
    },
    props: {
        aid: {
            type: Number,
            required: true
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        /**
         * 覆盖组件
         */
        upload(val) {
            let fd = new FormData();
            fd.append("image", val.file);
            if (this.$route.params.aid) {
                fd.append("aid", this.$route.params.aid);
                this.$post("/upload/add", fd, data => {
                    this.getList();
                });
            } else {
                this.$post("/upload/add", fd, data => {
                    this.getList();
                });
            }
        },
        uploadSuccess() {
            this.fileList[this.fileList.length - 1] = this.file;
        },
        selectFile(file) {
            this.url = file.url;
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
        getList() {
            if (this.$route.params.aid) {
                this.paging.typeName = "id";
                this.paging.type = this.$route.params.aid;
                this.$post("/upload", { paging: this.paging }, data => {
                    this.fileList = data.data;
                    this.paging = data.paging;
                });
            } else {
                this.paging.typeName = "status";
                this.paging.type = 1;
                this.$post("/upload", { paging: this.paging }, data => {
                    this.fileList = data.data;
                    this.paging = data.paging;
                });
            }
        },
        delFile(file) {
            let del = [];
            del.push(file.fid);
            this.$post("/upload/del", { fid: del }, data => {});
        }
    }
};
</script>

<style scoped>
</style>