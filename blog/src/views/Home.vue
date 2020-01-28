<template>
    <div id="ArticleList">
        <headEle></headEle>
        <articleItem :list-data="articleLists"></articleItem>
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
            articleLists: ""
        };
    },
    methods: {
        getMessage() {
            Axios.post("api/api/client")
                .then(res => {
                    this.articleLists = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getMessage();
    }
};
</script>

<style>
#ArticleList {
    height: 100%;
}
</style>
