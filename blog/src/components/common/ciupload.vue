<template>
    <div class="ciupload">
        <form action=""
              enctype="multipart/form-data"
              method="post">
            <input type="file"
                   class="ciupload-file"
                   name="ciupload"
                   multiple="multiple"
                   ref="ciupload">
        </form>
        <button @click="click()">上传文件</button>
    </div>
</template>

<script>
export default {
    name: "ciupload",
    data() {
        return {
            dom: null
        };
    },
    mounted() {
        this.getdom();
    },
    methods: {
        getdom() {
            this.$nextTick(() => {
                this.dom = this.$refs.ciupload;
            });
        },
        click() {
            this.dom.addEventListener("change", this.upload, false);
            this.dom.click();
        },
        upload() {
            var fileObj = this.dom.files;
            var formData = new FormData();
            for (let i = 0; i < fileObj.length; i++) {
                formData.append("image" + i, fileObj[i]);
            }
            formData.append("aid", -2);
            this.$post("/upload/add", formData, data => {
                this.$emit("afterUpload", data);
                this.dom.removeEventListener("change", this.upload, false);
            });
        }
    }
};
</script>

<style scoped>
.ciupload-file {
    display: none;
}
button {
    width: 100%;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background-color: #409eff;
    border: 1px solid #dcdfe6;
    color: #fff;
    text-align: center;
    margin: 0;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
button:hover {
    background-color: #40a0ffc7;
}
</style>