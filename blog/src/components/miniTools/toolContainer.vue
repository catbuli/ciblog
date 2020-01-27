<template>
    <div id="tool-container">
        <div class="tool-item"
             v-if="isShowMouse">
            <mouseTool></mouseTool>
        </div>
        <div class="tool-item"
             v-if="isShowSearch">
            <searchTool></searchTool>
        </div>
    </div>
</template>

<script>
import mouseTool from "@/components/miniTools/mouseTool.vue";
import searchTool from "@/components/miniTools/searchTool.vue";

export default {
    name: "toolContainer",
    data() {
        return {};
    },
    props: {
        isShowMouse: false,
        isShowSearch: false
    },
    components: {
        mouseTool,
        searchTool
    },
    mounted() {},
    watch: {},
    methods: {
        handleSearchView() {
            this.isShow = !this.isShow;
        },
        handleScroll(e) {
            this.isShow = false;
        },
        search() {
            console.log(2);
        }
    }
};
</script>

<style scoped>
#tool-container {
    display: flex;
    justify-content: space-around;
}
.tool-item {
    /* flex: 1; */
}
</style>