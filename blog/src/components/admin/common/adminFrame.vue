<template>
    <div id="admin-frame"
         :style="{ height: height,width:width}">
        <adminTitle :title="title"></adminTitle>
        <slot></slot>
    </div>
</template>

<script>
import adminTitle from "@/components/admin/common/adminTitle.vue";
export default {
    name: "adminFrame",
    components: {
        adminTitle
    },
    props: {
        title: String,
        height: String,
        width: String
    },
    mounted() {
        console.log(this.height);
    }
};
</script>

<style scoped>
#admin-frame {
    min-width: 1000px;
    width: 60%;
    margin: 0 auto;
    text-align: left;
}
</style>