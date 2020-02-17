<template>
    <div id="home">
        <headEle :backgroundImage="'url('+backgroundImage+')'"></headEle>
        <articleItem :list-data="$store.state.article.articleList"></articleItem>
        <paging action="getArticleListAction"
                align="center"
                :paging="paging"
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
                typeName: "all",
                total: 0
            },
            backgroundImage: ""
        };
    },
    watch: {
        "$store.state.global.paging": function() {
            this.paging = this.$store.state.global.paging;
        },
        "$store.state.global.system": function() {
            this.backgroundImage = this.$store.state.global.system.randomBanner;
        }
    },
    created() {
        this.$store.dispatch("getSystemAciton");
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
#home {
    height: 100%;
    width: 100%;
    position: absolute;
}
.articleItem {
    margin-top: 30px;
}
</style>
