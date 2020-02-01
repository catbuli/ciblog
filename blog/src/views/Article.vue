<template>
    <div id="Article">
        <headEle></headEle>
        <article>
            <div class="article-header">
                <h2 class="article-title"
                    v-text="$store.state.article.article.title"></h2>
                <div class="article-meta">
                    <span class="article-meta-label iconfont iconpushpin">{{$store.state.article.article.pv}}次阅读</span>
                    <span class="article-meta-label iconfont iconpushpin"></span>
                    <span class="article-meta-label iconfont iconpushpin">{{$store.state.article.article.create_date}}</span>
                </div>
            </div>
            <div class="article-body">
                <div class="article-content"
                     v-html="$store.state.article.article.html">

                </div>
                <div class="article-other"></div>
                <div class="article-update"></div>
            </div>
            <div class="article-tags"></div>
            <div class="article-footer"></div>
        </article>
        <div class="comments">

        </div>
        <footEle></footEle>
        <backTop></backTop>
    </div>
</template>

<script>
// @ is an alias to /src
import footEle from "@/components/footer/footEle.vue";
import headEle from "@/components/header/headEle.vue";
import backTop from "@/components/common/backTop.vue";
import Axios from "axios";

export default {
    name: "home",
    components: {
        headEle,
        footEle,
        backTop
    },
    data() {
        return {
            articleLists: "",
            loading: true
        };
    },
    "$store.state.article.article": function() {
        this.article = this.$store.state.article.article;
        this.loading = false;
    },
    methods: {
        getArticleData(aid) {
            this.$store.dispatch("getArticleDataAction", aid);
        }
    },
    mounted() {
        this.getArticleData(this.$route.params.id);
    }
};
</script>

<style scoped>
#Article {
}
article {
    border-radius: 10px;
    margin: 0 auto;
    width: 700px;
    background: #ffffff;
    padding: 15px;
}
.article-titile {
    text-align: center;
    font-size: 1.5rem;
    margin: 20px auto;
}
.article-meta {
    text-align: center;
}
.article-meta-label {
    font-size: 16px;
    margin: 0 15px;
}
.article-content {
    text-align: left;
    font-size: 105%;
    line-height: 1.5rem;
    word-wrap: break-word;
    word-break: break-all;
    border-top: 1px dashed #dadada;
    padding: 20px 0;
    margin-top: 25px;
}
.article-update {
    border-bottom: 1px dashed #dadada;
}
.article-tags {
    height: 50px;
    border-bottom: 1px dashed #dadada;
}
</style>
