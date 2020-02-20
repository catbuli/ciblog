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
            loading: true
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
            console.log(val);
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
            this.$message({
                type: "success",
                message:
                    process.env.VUE_APP_UPLOADPATH +
                    file.url.replace("\\", "/"),
                effect: "dark"
            });
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