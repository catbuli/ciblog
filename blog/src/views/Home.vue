<template>
    <div id="home">
        <headEle :backgroundImage="'url('+$store.state.global.system.randomBanner+')'"></headEle>
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
import footEle from "@/components/common/footEle.vue";
import headEle from "@/components/common/headEle.vue";
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
                type: 0,
                typeName: "all",
                total: 0
            }
        };
    },
    watch: {
        "$store.state.global.personalData"() {
            this.setTitle();
        }
    },
    methods: {
        handlePage() {
            this.loading = true;
        },
        setTitle() {
            let nickname = this.$store.state.global.personalData.nickname;
            let description = this.$store.state.global.personalData.description;
            document.title = nickname + "-" + description;
        }
    },
    created() {
        this.$store.dispatch("getPersonalDataAction");
        this.setTitle();
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
