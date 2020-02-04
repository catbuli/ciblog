<template>
    <adminFrame title="系统设置">
        <mouseTool></mouseTool>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
import mouseTool from "@/components/miniTools/mouseTool.vue";
export default {
    name: "systemSettings",
    components: {
        adminFrame,
        mouseTool
    },
    data() {
        return {};
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$store.dispatch("getCountAction");
        }
    }
};
</script>

<style scoped>
.sign {
    font-size: 60px;
    color: #ff7b00;
}
.index-top p a {
    margin-right: 20px;
}
</style>