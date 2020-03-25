<template>
    <ul id="articleItem">
        <li v-for="item in listData"
            class="card"
            :key="item.aid">
            <a class="article-title"
               v-text="item.title"
               @click="jump(item.aid)"
               href=""></a>
            <div class="card-top">
                <i class="iconfont iconflag">
                    <span class="card-top-categories"
                          v-for="category in item.category"
                          :key="category.mid"
                          @click="categoryJump(category.name,category.mid)">{{category.name}}</span>
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
        // article_reviews : Number,
        // article_pv : Number,
    },
    filters: {
        handleDate(value) {
            if (value) return value.split(" ")[0];
        }
    },
    mounted() {},
    methods: {
        jump(id) {
            this.$router.push({
                path: `/article/${id}`
            });
        },
        categoryJump(name, mid) {
            if ((name, mid)) {
                this.$router.push({
                    path: `/search/category/${mid}`
                    // query: {
                    //     typeName: "category",
                    //     type: name,
                    //     mid: mid
                    // }
                });
            }
        }
    }
};
</script>

<style scoped>
#articleItem {
    margin-top: 50px;
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
.card-top-categories {
    cursor: pointer;
}
.card-top-categories + .card-top-categories::before {
    content: " • ";
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

ul li {
    text-align: left;
    background-color: #ffffff;
    list-style: none;
    width: 700px;
    margin: 0 auto 70px;
    border-radius: 8px;
    padding: 15px;
}

ul li:hover {
    box-shadow: 0px 0px 10px 5px #9d9d9d;
    transition: all 0.5s ease;
}

ul a {
    text-decoration: none;
    color: #333;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
</style>
