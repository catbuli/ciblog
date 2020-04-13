<template>
    <div id="log"
         class="index-frame">
        <headEle height="70%"
                 :isShowInfo="false"
                 :backgroundImage="'url('+banner+')'"></headEle>
        <div class="element-frame">
            <div class="log-main">
                <div class="log-tags">
                    <h1 class="log-title text-shadow">Tags</h1>
                    <div class="meta">
                        <miniTag v-for="item in tagList"
                                 :key="item.mid"
                                 :href="`/search/tag/${item.mid}`"
                                 :content="item.name"></miniTag>
                    </div>
                </div>
                <div class="log-categorys">
                    <h1 class="log-title text-shadow">Categorys</h1>
                    <div class="meta">
                        <miniTag v-for="item in categoryList"
                                 :key="item.mid"
                                 :href="`/search/category/${item.mid}`"
                                 :content="item.name"></miniTag>
                    </div>
                </div>
                <timeLine :data="timeline"></timeLine>
            </div>
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
@media screen and (max-width: 480px) {
    .meta {
        padding-left: 20px !important;
    }
} /* 超小设备（手机，小于 480px） */
#log {
    position: absolute;
}
.log-main {
    width: 90%;
    margin: 0 auto;
    h1 {
        margin: 0 0 20px 0;
    }
    .meta {
        padding-left: 40px;
    }
    .log-tags {
        text-align: left;
        padding-bottom: 50px;
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-name: left;
        animation-delay: 0.7s;
    }
    .log-categorys {
        text-align: left;
        padding-bottom: 50px;
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-name: right;
        animation-delay: 0.7s;
    }
    .log-title {
        text-align: left;
        font-size: 2.5rem;
    }
    @keyframes left {
        0% {
            opacity: 0;
            transform: translate3d(-3000px, 0, 0);
        }
        60% {
            opacity: 1;
            transform: translate3d(25px, 0, 0);
        }
        75% {
            transform: translate3d(-10px, 0, 0);
        }
        90% {
            transform: translate3d(5px, 0, 0);
        }
        100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translateZ(0);
        }
    }
    @keyframes right {
        0% {
            opacity: 0;
            transform: translate3d(3000px, 0, 0);
        }
        60% {
            opacity: 1;
            transform: translate3d(-25px, 0, 0);
        }
        75% {
            transform: translate3d(10px, 0, 0);
        }
        90% {
            transform: translate3d(-5px, 0, 0);
        }
        100% {
            transform: translateZ(0);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
    }
}
</style>