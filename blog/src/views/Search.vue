<template>
    <div id="search"
         :key="$route.fullPath">
        <headEle height="70%"
                 :backgroundImage="'url('+$store.state.global.system.randomBanner+')'"></headEle>
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
import footEle from "@/components/common/footEle.vue";
import headEle from "@/components/common/headEle.vue";
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
            paging: {
                pageSize: 5,
                currentPage: 1,
                type: -1,
                typeName: "all",
                total: 0
            }
        };
    },
    computed: {
        searchDescription() {
            return this.$store.state.global.personalData.description;
        }
    },
    watch: {
        "$route.fullPath"() {
            this.search();
            console.log(this.$route.fullPath);
        }
    },
    mounted() {
        this.search();
    },
    created() {
        this.$store.dispatch("getSystemAciton");
    },
    methods: {
        search() {
            switch (this.$route.query.typeName) {
                case "keyword":
                    console.log(this.$route.query.typeName);
                    this.searchMessage =
                        "包含关键字 " + this.$route.query.type + " 的文章";
                    this.paging.typeName = this.$route.query.typeName;
                    this.paging.type = this.$route.query.type;
                    break;
                case "category":
                    console.log(this.$route.query.typeName);
                    this.searchMessage =
                        "所属分类为 " + this.$route.query.type + " 的文章";
                    this.paging.typeName = this.$route.query.typeName;
                    this.paging.type = this.$route.query.mid;
                    break;
                case "tag":
                    console.log(this.$route.query.typeName);
                    this.searchMessage =
                        "拥有 " + this.$route.query.type + " 标签的文章";
                    this.paging.typeName = this.$route.query.typeName;
                    this.paging.type = this.$route.query.mid;
                    break;
                default:
                    break;
            }
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
