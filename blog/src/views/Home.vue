<template>
    <div id="ArticleList">
        <!-- <headEle></headEle> -->
        <articleItem :list-data="$store.state.article.articleList"></articleItem>
        <el-pagination background
                       layout="jumper,prev,pager,next,total"
                       :total="paging.total"
                       :page-size="paging.pageSize"
                       style="text-align:center"
                       @current-change="currentChange">
        </el-pagination>
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
        return {
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
    mounted() {
        this.getArticleList();
    },
    methods: {
        getArticleList() {
            this.$store.dispatch("getArticleListAction", this.paging);
        },
        currentChange(e) {
            this.paging.currentPage = e;
            this.getArticleList();
            scrollTo(0, 0);
        }
    }
};
</script>

<style>
#ArticleList {
    height: 100%;
}
</style>
