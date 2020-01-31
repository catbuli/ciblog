<template>
    <div id="ArticleList">
        <headEle></headEle>
        <articleItem :list-data="$store.state.article.articleList"></articleItem>
        <footEle></footEle>
        <backTop></backTop>
    </div>
</template>

<script>
// @ is an alias to /src
import footEle from "@/components/footer/footEle.vue";
import headEle from "@/components/header/headEle.vue";
import articleItem from "@/components/common/articleItem.vue";
import backTop from "@/components/common/backTop.vue";
import Axios from "axios";

export default {
    name: "home",
    components: {
        headEle,
        footEle,
        articleItem,
        backTop
    },
    data() {
        return {};
    },
    mounted() {
        this.getArticleList();
    },
    methods: {
        getArticleList() {
            this.$store.dispatch("getArticleListAction");
        }
    }
};
</script>

<style>
#ArticleList {
    height: 100%;
}
</style>
