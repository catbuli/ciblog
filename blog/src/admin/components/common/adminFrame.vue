<template>
    <div id="admin-frame"
         :style="{ height: height,width:width}">
        <adminTitle :title="title"></adminTitle>
        <slot></slot>
        <footEle></footEle>
    </div>
</template>

<script>
import footEle from "@/components/common/footEle.vue";
import adminTitle from "@/admin/components/common/adminTitle.vue";
export default {
    name: "adminFrame",
    components: {
        adminTitle,
        footEle
    },
    props: {
        title: String,
        height: String,
        width: String
    },
    mounted() {}
};
</script>

<style scoped>
#admin-frame {
    min-width: 1000px;
    width: 60%;
    margin: auto;
    text-align: left;
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
}
</style>