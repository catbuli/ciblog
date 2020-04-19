<template>
    <div class="ciupload">
        <form action=""
              enctype="multipart/form-data"
              method="post">
            <input type="file"
                   class="ciupload-file"
                   name="ciupload"
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
                this.dom.addEventListener("change", this.upload, false);
            });
        },
        click() {
            this.dom.click();
        },
        upload() {
            var fileObj = this.dom.files[0];
            var formData = new FormData();
            formData.append("image", fileObj);
            formData.append("aid", -2);
            this.$post("/upload/add", formData, data => {
                this.$emit("afterUpload", data);
            });
        }
    }
};
</script>

<style scoped>
.ciupload-file {
    display: none;
}
</style>