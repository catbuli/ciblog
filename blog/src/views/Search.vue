<template>
    <div id="search">
        <headEle height="70%"></headEle>
        <div class="search-message">
            <p v-html="searchMessage"></p>
            <p v-html="searchDescription"></p>
        </div>
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
    name: "search",
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
            searchMessage: "",
            searchDescription: "",
            paging: {
                pageSize: 5,
                currentPage: 1,
                type: -1,
                typeName: "all",
                total: 0
            }
        };
    },
    watch: {
        "$store.state.global.personalData.description": function() {
            this.searchDescription = this.$store.state.global.personalData.description;
        },
        $route: function(to, form) {
            this.$store.commit("REFRESH", to.fullPath);
        }
    },
    mounted() {
        this.search();
    },
    methods: {
        search() {
            switch (this.$route.query.typeName) {
                case "keyword":
                    this.searchMessage =
                        "包含关键字 " + this.$route.query.type + " 的文章";
                    this.searchDescription = this.$store.state.global.personalData.description;
                    break;
                default:
                    break;
            }
            this.paging.typeName = this.$route.query.typeName;
            this.paging.type = this.$route.query.type;
        },
        handlePage() {
            this.loading = true;
        }
    }
};
</script>

<style>
#search {
    height: 100%;
    width: 100%;
    position: absolute;
}
.search-message {
    text-align: left;
    background-color: #ffffff;
    width: 700px;
    margin: 0 auto;
    border-radius: 8px;
    padding: 17px;
}
</style>
