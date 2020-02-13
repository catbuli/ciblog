<template>
    <div id="ArticleList">
        <!-- <headEle></headEle> -->
        <articleItem :list-data="$store.state.article.articleList"></articleItem>
        <paging action="getArticleListAction"
                align="center"
                @function="handlePage"></paging>
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
import paging from "@/components/common/paging.vue";

export default {
    name: "home",
    components: {
        headEle,
        footEle,
        articleItem,
        backTop,
        paging
    },
    data() {
        return {
            loading: true,
            paging: {
                pageSize: 5,
                currentPage: 1,
                type: -1,
                typeName: "status",
                total: 0
            }
        };
    },
    watch: {
        "$store.state.global.paging": function() {
            this.paging = this.$store.state.global.paging;
        }
    },
    mounted() {},
    methods: {
        handlePage() {
            this.loading = true;
        }
    }
};
</script>

<style>
#ArticleList {
    height: 100%;
}
</style>
