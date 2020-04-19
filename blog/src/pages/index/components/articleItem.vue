<template>
    <ul id="articleItem"
        ref="articleList">
        <animationFrame className="fade-out-sway"
                        v-if="article&&top"
                        class="card">
            <li>
                <span class="article-title link"
                      v-text="article.title"
                      @click="jump(article.aid)"></span>
                <span class="top">置顶</span>
                <div class="card-top">
                    <i class="iconfont iconflag">
                        <a class="card-top-categories"
                           v-for="category in article.category"
                           :key="category.mid"
                           target="_blank"
                           :href="`/search/category/${category.mid}`">{{category.name}}</a>
                    </i>
                    <i class="iconfont icontime-circle"
                       style="margin-left:10px">
                        <span class="card-top-date">{{article.create_date|handleDate}}</span>
                    </i>
                </div>
                <img class="article-image"
                     :src="article.cover_url"
                     @click="jump(article.aid)">
                <p class="article-content"
                   v-text="article.description"></p>
                <div class='card-line'></div>
                <div class="card-bottom">
                    <span class="card-bottom-left">
                        <a @click="jump(article.aid)"
                           style="cursor: pointer;">
                            ••• •••
                        </a>
                    </span>
                    <span class="card-bottom-right">
                        <i class="iconfont iconcomment">{{' '+article.comment_count}}</i>
                        <i class="iconfont iconeye">{{' '+article.pv}}</i>
                    </span>
                </div>
            </li>
        </animationFrame>
        <animationFrame className="fade-out-sway"
                        class="card"
                        v-for="item in listData"
                        :key="item.aid">
            <li>
                <span class="article-title link"
                      v-text="item.title"
                      @click="jump(item.aid)"></span>
                <div class="card-top">
                    <i class="iconfont iconflag">
                        <a class="card-top-categories"
                           v-for="category in item.category"
                           :key="category.mid"
                           target="_blank"
                           :href="`/search/category/${category.mid}`">{{category.name}}</a>
                    </i>
                    <i class="iconfont icontime-circle"
                       style="margin-left:10px">
                        <span class="card-top-date">{{item.create_date|handleDate}}</span>
                    </i>
                </div>
                <img class="article-image"
                     :src="item.cover_url"
                     @click="jump(item.aid)">
                <p class="article-content"
                   v-text="item.description"></p>
                <div class='card-line'></div>
                <div class="card-bottom">
                    <span class="card-bottom-left">
                        <a @click="jump(item.aid)"
                           style="cursor: pointer;">
                            ••• •••
                        </a>
                    </span>
                    <span class="card-bottom-right">
                        <i class="iconfont iconcomment">{{' '+item.comment_count}}</i>
                        <i class="iconfont iconeye">{{' '+item.pv}}</i>
                    </span>
                </div>
            </li>
        </animationFrame>
    </ul>
</template>

<script>
import animationFrame from "@/components/common/animationFrame.vue";
export default {
    name: "Item",
    components: {
        animationFrame
    },
    data() {
        return {
            topRead: {}
        };
    },
    props: {
        listData: {},
        top: ""
    },
    filters: {
        handleDate(value) {
            if (value) return value.split(" ")[0];
        }
    },
    computed: {
        article() {
            if (this.$store.state.article.article) {
                return this.$store.state.article.article;
            }
        }
    },
    watch: {
        top() {
            this.getTopArticle();
        }
    },
    mounted() {
        this.getTopArticle();
    },
    methods: {
        handleScroll(e) {
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            this.$refs.articleList.children.forEach((element, index) => {
                if (
                    scrollTop + document.body.clientHeight - 200 >=
                        element.offsetTop &&
                    index > 0
                ) {
                    element.classList.add("show");
                }
            });
        },
        getTopArticle() {
            if (this.top) {
                this.$store.dispatch("getArticleDataAction", this.top);
            }
        },
        jump(id) {
            this.$router.push({
                path: `/article/${id}`
            });
        },
        categoryJump(name, mid) {
            if ((name, mid)) {
                this.$router.push({
                    path: `/search/category/${mid}`
                });
            }
        }
    }
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 480px) {
    #articleItem {
        .card {
            margin-bottom: 30px !important;
            .article-title {
                font-size: 1.5rem !important;
            }
            .article-image {
                height: 170px !important;
            }
        }
    }
} /* 超小设备（手机，小于 480px） */

#articleItem {
    transition: all 1s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    .card {
        width: 90%;
        text-align: left;
        background-color: #ffffff;
        list-style: none;
        margin: 0 auto 60px;
        border-radius: 8px;
        padding: 15px;
        overflow: hidden;
        position: relative;
        .top {
            position: absolute;
            color: white;
            right: -65px;
            font-size: 1.3rem;
            text-align: center;
            transform: rotateZ(40deg);
            float: right;
            width: 200px;
            background-color: tomato;
        }
        .article-title {
            margin: 0px;
            font-size: 1.5rem;
        }
        .article-image {
            width: 100%;
            height: 330px;
            cursor: pointer;
        }
        .article-content {
            width: 80%;
            margin: 10px 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .card-top {
            margin: 7px 0px;
            i {
                font-size: 0.9rem;
            }
            .card-top-categories {
                cursor: pointer;
            }
            .card-top-categories + .card-top-categories::before {
                content: " • ";
            }
            .card-top-date {
                color: #8a8a8a;
            }
        }
        .card-line {
            width: 100%;
            height: 2px;
            margin: 10px 0;
            overflow: hidden;
            font-size: 0;
            border-bottom: 1px solid #e1e1e1;
        }
        .card-bottom {
            .card-bottom-right {
                float: right;
                i {
                    font-size: 1rem;
                }
                i + i {
                    margin-left: 10px;
                }
            }
        }
    }
    .card:hover {
        box-shadow: 0px 5px 10px 5px #acacac;
        transition: all 0.5s ease;
    }
}
</style>
