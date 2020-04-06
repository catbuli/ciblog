<template>
    <ul id="articleItem"
        ref="articleList">
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
                        <i class="iconfont iconcomment"
                           v-text="item.comment_count"></i>
                        <i class="iconfont iconeye"
                           style="margin-left:10px"
                           v-text="item.pv"></i>
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
    props: {
        listData: {}
    },
    filters: {
        handleDate(value) {
            if (value) return value.split(" ")[0];
        }
    },
    watch: {
        // listData(oldVal, newVal) {
        //     this.$nextTick(() => {
        //         if (this.$refs.articleList) {
        //             this.$refs.articleList.children
        //                 .item(0)
        //                 .classList.add("show");
        //         }
        //     });
        //     // 博客↑
        // }
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
    // mounted() {
    //     document.addEventListener("scroll", this.handleScroll, true);
    // },
    // destroyed() {
    //     document.removeEventListener("scroll", this.handleScroll, true);
    // }
};
</script>

<style lang="less" scoped>
#articleItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .card {
        width: 90%;
        text-align: left;
        background-color: #ffffff;
        list-style: none;
        margin: 0 auto 70px;
        border-radius: 8px;
        padding: 15px;
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
            margin: 10px 0px;
            i {
                font-size: 15px;
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
            }
        }
    }
    .card:hover {
        box-shadow: 0px 0px 10px 5px #9d9d9d;
        transition: all 0.5s ease;
    }
}
</style>
