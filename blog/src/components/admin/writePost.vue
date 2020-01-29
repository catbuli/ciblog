<template>
    <adminFrame>
        <adminTitle title="写文章"></adminTitle>

    </adminFrame>
</template>

<script>
import adminTitle from "@/components/admin/common/adminTitle.vue";
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "writePost",
    components: {
        adminTitle,
        adminFrame
    },
    data() {
        return {};
    },
    mounted() {},
    watch: {},
    methods: {
        getData() {
            this.$http
                .post("/api/api/client/personal")
                .then(res => {
                    this.personalData = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        submit() {
            this.$http
                .post("/api/api/client/personal/update", {
                    data: this.personalData
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: "个人信息更新成功！",
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
</style>