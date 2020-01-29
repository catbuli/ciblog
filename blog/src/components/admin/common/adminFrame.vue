<template>
    <div id="admin-frame">
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
        title: String
    }
};
</script>

<style scoped>
#admin-frame {
    min-width: 1000px;
    width: 60%;
    margin: 0 auto;
}
</style>