<template>
    <div id="search"
         :key="$route.fullPath">
        <headEle height="70%"
                 :backgroundImage="'url('+banner+')'"></headEle>
        <div class="search-message"
             v-loading="loading">
            <p v-html="searchMessage"></p>
            <p v-html="searchDescription"></p>
        </div>
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
import headEle from "../components/headEle.vue";
import articleItem from "../components/articleItem.vue";
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
    computed: {
        articleList() {
            return this.$store.state.article.articleList;
        },
        banner() {
            let url = this.$store.state.global.system.randomBanner;
            if (!url) {
                url =
                    "https://ciblog.oss-cn-shanghai.aliyuncs.com/images/bg4.jpg";
            }
            return url;
        },
        webDescription() {
            return this.$store.state.global.system.web_description;
        }
    },
    watch: {
        "$route.fullPath"() {
            this.search();
        },
        webDescription() {
            this.searchDescription = this.webDescription;
        },
        articleList() {
            this.loading = false;
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
            if (this.$route.params.type && this.$route.params.typeName) {
                this.searchDescription = this.webDescription;
                this.paging.typeName = this.$route.params.typeName;
                this.paging.type = this.$route.params.type;
                switch (this.$route.params.typeName) {
                    case "keyword":
                        this.searchMessage =
                            "包含关键字 " + this.$route.params.type + " 的文章";
                        break;
                    case "category":
                        this.searchMessage = "所属分类为 " + "   " + " 的文章";
                        this.$post(
                            "/category/bymid",
                            { mid: this.$route.params.type },
                            data => {
                                this.searchDescription = data.data.description;
                                this.searchMessage =
                                    "所属分类为 " + data.data.name + " 的文章";
                            }
                        );
                        break;
                    case "tag":
                        this.searchMessage = "拥有 " + "   " + " 标签的文章";
                        this.$post(
                            "/tag/bymid",
                            { mid: this.$route.params.type },
                            data => {
                                this.searchMessage =
                                    "拥有 " + data.data.name + " 标签的文章";
                            }
                        );
                        break;
                    default:
                        this.$router.push({ path: `/404` });
                        break;
                }
            } else {
                this.$router.push({ path: `/404` });
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
