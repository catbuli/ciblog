<template>
    <div id="home">
        <headEle :backgroundImage="'url('+banner+')'"></headEle>
        <articleItem :list-data="articleList"></articleItem>
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
import articleItem from "../components/articleItem.vue";
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
    computed: {
        banner() {
            return this.$store.state.global.system.randomBanner;
        },
        articleList() {
            return this.$store.state.article.articleList;
        }
    },
    watch: {
        "$store.state.global.system"() {
            this.setTitle();
        }
    },
    methods: {
        handlePage() {
            this.loading = true;
        },
        setTitle() {
            let nickname = this.$store.state.global.system.web_name;
            let description = this.$store.state.global.system.web_description;
            if (nickname && description) {
                document.title = nickname + "-" + description;
            }
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
