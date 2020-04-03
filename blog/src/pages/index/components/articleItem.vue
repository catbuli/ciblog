<template>
    <ul id="articleItem"
        ref="articleList">
        <li v-for="item in listData"
            class="card"
            :key="item.aid">
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
    </ul>
</template>

<script>
export default {
    name: "Item",
    props: {
        listData: {},
        article_id: Number,
        article_title: String,
        article_date: String
    },
    filters: {
        handleDate(value) {
            if (value) return value.split(" ")[0];
        }
    },
    methods: {
        getCardHeight() {
            this.listData.length;
        },
        handleScroll(e) {
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            this.$refs.articleList.children.forEach((element, index) => {
                if (
                    scrollTop + document.body.clientHeight - 200 >=
                    element.offsetTop
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
    },
    mounted() {
        document.addEventListener("scroll", this.handleScroll, true);
        this.handleScroll();
    },
    destroyed() {
        document.removeEventListener("scroll", this.handleScroll, true);
    }
};
</script>

<style scoped>
#articleItem {
    margin-top: 50px;
}

.show {
    visibility: visible !important;
    animation: show 1.5s ease;
    animation-fill-mode: forwards;
}
@keyframes show {
    0% {
        opacity: 0;
        transform: scale(0.4) rotateZ(-2deg);
    }
    20% {
        transform: rotateZ(2deg);
    }
    40% {
        transform: rotateZ(-2deg);
    }
    60% {
        transform: rotateZ(2deg);
    }
    80% {
        transform: rotateZ(-2deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotateZ(0);
    }
}
.card {
    opacity: 0;
    visibility: hidden;
    text-align: left;
    background-color: #ffffff;
    list-style: none;
    width: 700px;
    margin: 0 auto 70px;
    border-radius: 8px;
    padding: 15px;
}

.card:hover {
    box-shadow: 0px 0px 10px 5px #9d9d9d;
    transition: all 0.5s ease;
}
.card-line {
    width: 100%;
    height: 2px;
    margin: 10px 0;
    overflow: hidden;
    font-size: 0;
    border-bottom: 1px solid #e1e1e1;
}

.card-top {
    margin: 10px 0px;
}
.card-top i {
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
.card-bottom-right {
    float: right;
}

.article-title {
    margin: 0px;
    font-size: 1.5rem;
}

.article-image {
    width: 700px;
    height: 325px;
    cursor: pointer;
}

.article-content {
    width: 80%;
    margin: 10px 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

ul a {
    text-decoration: none;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
</style>
