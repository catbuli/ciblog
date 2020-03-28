<template>
    <div id="log"
         class="index-frame">
        <headEle height="70%"
                 :backgroundImage="'url('+banner+')'"></headEle>
        <footEle></footEle>
    </div>
</template>

<script>
import footEle from "@/components/common/footEle.vue";
import headEle from "../components/headEle.vue";
// import searchTool from "@/components/miniTools/searchTool.vue";
export default {
    name: "log",
    components: {
        footEle,
        headEle
    },
    created() {},
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
</style>