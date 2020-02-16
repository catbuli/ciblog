<template>
    <div id="upload">
        <el-upload drag
                   action="#"
                   :on-preview="selectFile"
                   :http-request="upload"
                   :file-list="fileList"
                   :on-remove="delFile">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip"
                 slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
import { post } from "@/http";
export default {
    name: "upload",
    data() {
        return {
            fileList: []
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
            fd.append("file", val.file);
            fd.append("aid", this.aid);
            post("/upload", fd, data => {
                // this.fileList = data.data.fileList;
                this.fileList.push(data.data.file);
            });
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
            post("/upload/getList", { aid: this.aid }, data => {
                this.fileList = data.data;
            });
        },
        delFile(file) {
            post("/upload/del", { fid: file.fid }, data => {});
        }
    }
};
</script>

<style scoped>
</style>