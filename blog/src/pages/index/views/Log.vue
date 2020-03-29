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
            <div class="timeline">
                <div class="timeline-item"
                     v-for="month in articleTimeLine"
                     :key="month.date">
                    <a class="timeline-title"
                       target="_blank"
                       :href="`/search/${month.date.split('-')[0]}/${month.date.split('-')[1]}`">{{month.date|handleDate}}</a>
                    <div class="timeline-content"
                         v-for="day in month.articleList"
                         :key="day.aid">
                        <span class="timeline-time">{{day.create_date|handleDay}}</span>
                        <a class="timeline-link"
                           target="_blank"
                           :href="`/article/${day.aid}`">{{day.title}}</a>
                    </div>
                </div>
            </div>
        </div>
        <footEle></footEle>
    </div>
</template>

<script>
import footEle from "@/components/common/footEle.vue";
import miniTag from "@/components/miniTools/miniTag.vue";
import headEle from "../components/headEle.vue";
// import searchTool from "@/components/miniTools/searchTool.vue";
export default {
    name: "log",
    components: {
        footEle,
        headEle,
        miniTag
    },
    created() {
        this.$store.dispatch("getCategoryListAction");
        this.$store.dispatch("getTagListAction");
    },
    filters: {
        handleDay(value) {
            return value.split(" ")[0].split("-")[2] + " 日";
        },
        handleDate(value) {
            return value.split("-")[0] + " 年 " + value.split("-")[1] + " 月";
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
        },
        articleTimeLine() {
            let data = [
                {
                    date: "2020-03",
                    articleList: [
                        {
                            aid: 155,
                            title: "asdasd1",
                            create_date: "2020-03-25 20:09:46"
                        },
                        {
                            aid: 156,
                            title: "asdasd2",
                            create_date: "2020-03-26 20:09:46"
                        },
                        {
                            aid: 157,
                            title: "asdasd3",
                            create_date: "2020-03-27 20:09:46"
                        }
                    ]
                },
                {
                    date: "2020-04",
                    articleList: [
                        {
                            aid: 158,
                            title: "asdasd1",
                            create_date: "2020-03-25 20:09:46"
                        },
                        {
                            aid: 159,
                            title: "asdasd2",
                            create_date: "2020-03-26 20:09:46"
                        },
                        {
                            aid: 160,
                            title: "asdasd3",
                            create_date: "2020-03-27 20:09:46"
                        }
                    ]
                }
            ];
            return data;
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
    .timeline {
        text-align: left;
        position: relative;
        .timeline-item {
            .timeline-title {
                display: inline-block;
                padding: 5px 20px;
                background: #6f6f6f;
                border-radius: 20px;
                color: white;
            }
            .timeline-title:hover {
                color: white !important;
            }
            .timeline-content {
                padding-left: 90px;
                margin: 10px 15px;
                .timeline-time {
                    position: absolute;
                    left: 18px;
                    width: 40px;
                }
                .timeline-time::after {
                    content: " ";
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background-color: #8a8a8a;
                    border-radius: 20px;
                    right: -27px;
                    top: 1px;
                }
                .timeline-link {
                    position: relative;
                }
                .timeline-link::before {
                    content: " ";
                    top: 5px;
                    left: -36px;
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background-color: white;
                    border-radius: 12px;
                    transition: all 0.5s ease;
                }
                .timeline-link:hover::before {
                    background-color: rgb(44, 44, 44);
                }
            }
        }
        .timeline-item::before {
            z-index: -1;
            content: "";
            position: absolute;
            width: 4px;
            left: 73px;
            top: 10px;
            height: 100%;
            background-color: #dcdcdc;
        }
    }
}
</style>