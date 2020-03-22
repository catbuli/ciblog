<template>
    <div id="admin-frame"
         :style="{ height: height,width:width}">
        <adminTitle :title="title">
            <i class="el-icon-refresh refresh"
               v-if="action"
               @click="refresh()"></i>
        </adminTitle>
        <slot></slot>
        <footEle></footEle>
    </div>
</template>

<script>
import footEle from "@/components/common/footEle.vue";
import adminTitle from "../common/adminTitle";
export default {
    name: "adminFrame",
    components: {
        adminTitle,
        footEle
    },
    props: {
        title: String,
        height: String,
        width: String,
        action: {
            type: Boolean,
            default: false
        }
    },
    mounted() {},
    methods: {
        refresh() {
            this.$emit("refresh-click");
        }
    }
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
.refresh {
    margin-left: 10px;
    cursor: pointer;
}
</style>