<template>
    <div class="ciupload">
        <form action=""
              enctype="multipart/form-data"
              method="post">
            <input type="file"
                   class="ciupload-file"
                   name="ciupload"
                   :multiple="multiple"
                   accept="image/*"
                   @change="http()"
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
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        fileList: []
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
            this.dom.click();
        },
        http() {
            this.$emit("http", this.dom.files);
            this.dom.value = "";
        }
    }
};
</script>

<style scoped>
.ciupload-file {
    display: none;
    width: auto;
}
.ciupload {
    display: inline-block;
}
button {
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