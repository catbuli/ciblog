<template>
    <div id="error"
         class="index-frame">
        <headEle height="70%"
                 :backgroundImage="'url('+banner+')'">
        </headEle>
        <div class="element-frame">
            <div class="error-main">
                <h3>哦吼！页面出错了搜索一下吧。</h3>
                <searchTool></searchTool>
            </div>
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
            let url = this.$store.state.global.system.randomBanner;
            if (!url) {
                url =
                    "https://ciblog.oss-cn-shanghai.aliyuncs.com/images/bg4.jpg";
            }
            return url;
        }
    }
};
</script>

<style scoped>
.error-main {
    height: 100px;
}
.error-main div {
    width: 60%;
    margin: 0 auto;
}
</style>