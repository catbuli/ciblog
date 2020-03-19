<template>
    <div id="error">
        <headEle height="70%"
                 :backgroundImage="'url('+banner+')'">
        </headEle>
        <div class="error-main">
            <h3>哦吼！页面出错了搜索一下吧。</h3>
            <searchTool></searchTool>
        </div>
        <footEle></footEle>
    </div>

</template>

<script>
import footEle from "@/components/common/footEle.vue";
import headEle from "../components/headEle.vue";
import searchTool from "@/components/miniTools/searchTool.vue";
export default {
    name: "errorPage",
    components: {
        footEle,
        headEle,
        searchTool
    },
    created() {
        this.$store.dispatch("getSystemAciton");
    },
    computed: {
        banner() {
            return this.$store.state.global.system.randomBanner;
        }
    }
};
</script>

<style scoped>
#error {
    position: absolute;
    width: 100%;
    height: 100%;
}
.error-main {
    height: 100px;
}
.error-main div {
    width: 60%;
    margin: 0 auto;
}
</style>