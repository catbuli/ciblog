<template>
    <div id="log"
         class="index-frame">
        <headEle height="70%"
                 :isShowInfo="false"
                 :backgroundImage="'url('+banner+')'"></headEle>
        <div class="log-main">
            <div class="log-tags">
                <h1 class="log-title">Tags</h1>
                <miniTag v-for="item in tagList"
                         :key="item.mid"
                         :href="`/search/tag/${item.mid}`"
                         :content="item.name"></miniTag>
            </div>
            <div class="log-categorys">
                <h1 class="log-title">Categorys</h1>
                <miniTag v-for="item in categoryList"
                         :key="item.mid"
                         :href="`/search/category/${item.mid}`"
                         :content="item.name"></miniTag>
            </div>
        </div>
        <footEle></footEle>
    </div>
</template>

<script>
import footEle from "@/components/common/footEle.vue";
import miniTag from "@/components/miniTools/miniTag.vue";
import headEle from "../components/headEle.vue";
// import searchTool from "@/components/miniTools/searchTool.vue";
export default {
    name: "log",
    components: {
        footEle,
        headEle,
        miniTag
    },
    created() {
        this.$store.dispatch("getCategoryListAction");
        this.$store.dispatch("getTagListAction");
    },
    computed: {
        categoryList() {
            return this.$store.state.category.categoryList;
        },
        tagList() {
            return this.$store.state.tag.tagList;
        },
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

<style lang="less" scoped>
.log-main {
    width: 720px;
    margin: 0 auto;
    .log-tags {
        text-align: left;
    }
    .log-categorys {
        text-align: left;
    }
    .log-title {
        text-align: left;
    }
}
</style>