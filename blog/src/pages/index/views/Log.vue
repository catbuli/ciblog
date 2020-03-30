<template>
    <div id="log"
         class="index-frame">
        <headEle height="70%"
                 :isShowInfo="false"
                 :backgroundImage="'url('+banner+')'"></headEle>
        <div class="log-main">
            <div class="log-tags">
                <h1 class="log-title text-shadow">Tags</h1>
                <div class="mate">
                    <miniTag v-for="item in tagList"
                             :key="item.mid"
                             :href="`/search/tag/${item.mid}`"
                             :content="item.name"></miniTag>
                </div>
            </div>
            <div class="log-categorys">
                <h1 class="log-title text-shadow">Categorys</h1>
                <div class="mate">
                    <miniTag v-for="item in categoryList"
                             :key="item.mid"
                             :href="`/search/category/${item.mid}`"
                             :content="item.name"></miniTag>
                </div>
            </div>
            <timeLine :data="timeline"></timeLine>
        </div>
        <footEle></footEle>
    </div>
</template>

<script>
import footEle from "@/components/common/footEle.vue";
import miniTag from "@/components/miniTools/miniTag.vue";
import headEle from "../components/headEle.vue";
import timeLine from "../components/timeLine.vue";
// import searchTool from "@/components/miniTools/searchTool.vue";
export default {
    name: "log",
    components: {
        footEle,
        headEle,
        miniTag,
        timeLine
    },
    data() {
        return {
            timeline: []
        };
    },
    created() {
        this.$store.dispatch("getCategoryListAction");
        this.$store.dispatch("getTagListAction");
        this.getTimeLineData();
    },
    methods: {
        getTimeLineData() {
            this.$post("/articlec/log", {}, data => {
                this.timeline = data.data;
            });
        }
    },
    computed: {
        categoryList() {
            return this.$store.state.category.categoryList;
        },
        tagList() {
            return this.$store.state.tag.tagList;
        },
        banner() {
            let url = this.$store.state.global.system.randomBanner;
            if (!url) {
                url =
                    "https://ciblog.oss-cn-shanghai.aliyuncs.com/images/bg4.jpg";
            }
            return url;
        }
    }
};
</script>

<style lang="less" scoped>
.log-main {
    width: 720px;
    margin: 0 auto;
    .mate {
        padding-left: 40px;
    }
    .log-tags {
        text-align: left;
        padding-bottom: 50px;
    }
    .log-categorys {
        text-align: left;
        padding-bottom: 50px;
    }
    .log-title {
        text-align: left;
        font-size: 2.5rem;
    }
}
</style>