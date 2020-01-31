<template>
    <div id="Article">
        <headEle></headEle>
        <article>
            <div class="article-header">
                <h2 class="article-title"
                    v-text="this.$route.params.id"></h2>
                <div class="article-meta">
                    <span class="article-meta-label iconfont iconpushpin">480次阅读</span>
                    <span class="article-meta-label iconfont iconpushpin"><a href="http://www.zhangyifei.top/index.php/category/%E6%95%99%E7%A8%8B%E6%96%87%E7%AB%A0/">教程文章</a></span>
                    <span class="article-meta-label iconfont iconpushpin">2019-07-19</span>
                </div>
            </div>
            <div class="article-body">
                <div class="article-content"></div>
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
            articleLists: ""
        };
    },
    methods: {
        getMessage(id) {}
    },
    mounted() {
        this.getMessage(this.$route.params.id);
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
