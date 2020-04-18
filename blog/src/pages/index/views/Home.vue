<template>
    <div id="home"
         class="index-frame">
        <headEle :backgroundImage="'url('+banner+')'"></headEle>
        <div class="element-frame">
            <articleItem v-if="articleList"
                         :list-data="articleList"
                         :top="system.top_article"></articleItem>
            <paging action="getArticleListAction"
                    align="center"
                    :paging="paging"
                    @function="handlePage"></paging>
        </div>
        <footEle></footEle>
    </div>
</template>

<script>
// @ is an alias to /src
import footEle from "@/components/common/footEle.vue";
import headEle from "../components/headEle.vue";
import articleItem from "../components/articleItem.vue";
import paging from "@/components/common/paging.vue";

export default {
    name: "home",
    components: {
        headEle,
        footEle,
        articleItem,
        paging
    },
    filters: {
        handleImage(value) {
            console.log(value);
        }
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
        system() {
            return this.$store.state.global.system;
        },
        banner() {
            let url = this.$store.state.global.system.randomBanner;
            if (!url) {
                url =
                    "https://ciblog.oss-cn-shanghai.aliyuncs.com/images/bg4.jpg";
            }
            return url;
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
    mounted() {},
    created() {
        this.setTitle();
    }
};
</script>

<style>
#home {
    position: absolute;
    width: 100%;
}
</style>
