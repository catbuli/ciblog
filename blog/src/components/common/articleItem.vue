<template>
    <ul id="articleItem">
        <li v-for="item in listData"
            :key="item.aid">
            <a class="article-title"
               v-text="item.title"
               @click="jump(item.aid)"
               href=""></a>
            <div class="card-top">
                <i class="iconfont iconflag"></i>
                <span class="card-top-categories"
                      v-text="item.category"></span>
                <i class="iconfont icontime-circle"></i>
                <span class="card-top-date"
                      v-text="item.create_date"></span>
            </div>
            <img class="article-image"
                 :src="item.cover_url"
                 @click="jump(item.aid)">
            <p class="article-content"
               v-text="item.text"></p>
            <div class='card-line'></div>
            <div class="card-bottom">
                <span class="card-bottom-left">
                    <a @click="jump(item.aid)"
                       href="">
                        <i class="iconfont iconellipsis"></i>
                        <i class="iconfont iconellipsis"></i>
                    </a>
                </span>
                <span class="card-bottom-right">
                    <i class="iconfont iconcomment"
                       v-text="item.comment_count"></i>
                    <i class="iconfont iconeye"
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
    mounted() {},
    methods: {
        jump(id) {
            this.$router.push({
                path: `/article/${id}`
            });
        }
    }
};
</script>

<style scoped>
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
}
.card-top-categories::after {
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
    color: #000000;
}
</style>
