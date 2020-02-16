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
            fileList: [],
            paging: {
                pageSize: 10,
                currentPage: 1,
                type: -1,
                typeName: "id",
                total: 0
            }
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
    watch: {
        "$store.state.file.fileList": function() {
            this.fileList = this.$store.state.file.fileList;
            this.loading = false;
        }
    },
    methods: {
        /**
         * 覆盖组件
         */
        upload(val) {
            let fd = new FormData();
            fd.append("file", val.file);
            fd.append("aid", this.aid);
            post("/upload/add", fd, data => {
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
            this.paging.type = this.$route.params.aid;
            this.$store.dispatch("getFileListAction", this.paging);
        },
        delFile(file) {
            this.$store.dispatch("delFileAction", file.fid);
        }
    }
};
</script>

<style scoped>
</style>