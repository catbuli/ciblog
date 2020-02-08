<template>
    <div id="Article">
        <headEle></headEle>
        <article>
            <div class="article-header">
                <h2 class="article-title"
                    v-text="$store.state.article.article.title"></h2>
                <div class="article-meta">
                    <span class="article-meta-label iconfont iconpushpin">{{$store.state.article.article.pv}}次阅读</span>
                    <span class="article-meta-label iconfont iconpushpin">
                        <a href=""
                           class="category"
                           v-for="category in $store.state.article.article.category"
                           :key="category.cid">{{category.name}}</a></span>
                    <span class="article-meta-label iconfont iconpushpin">{{$store.state.article.article.create_date}}</span>
                </div>
            </div>
            <div class="article-body">
                <div class="article-content"
                     v-html="$store.state.article.article.html">
                </div>
                <div class="article-other"></div>
                <div class="article-update"></div>
            </div>
            <div class="article-tags">
                <span v-for="item in $store.state.article.article.tag"
                      :key="item.cid"><i class="el-icon-collection-tag">{{item.name}}</i></span>
            </div>
            <div class="article-footer">
                <div class="article-previous">ssss</div>
                <div class="article-next">aaaa</div>
            </div>
        </article>
        <div class="comments">
            <ul>
                <li v-for="item in $store.state.comment.comment"
                    :key="item.cid">
                    <p>{{item.content}}</p>
                    <p>by{{item.nickname}}at{{item.create_date}}</p>
                </li>
            </ul>
        </div>
        <div class="add-comment">
            <el-input v-model="commentData.nickname"></el-input>
            <el-input v-model="commentData.email"></el-input>
            <el-input v-model="commentData.content"
                      type="textarea"
                      placeholder="请输入内容"
                      maxlength="30"
                      :rows=5></el-input>
            <el-button @click="addComment">添加</el-button>
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
            articleLists: "",
            loading: true,
            commentData: {
                content: "",
                nickname: "",
                email: ""
            }
        };
    },
    watch: {
        "$store.state.article.article": function() {
            this.loading = false;
        },
        "$store.state.comment.comment": function() {
            this.commentData.content = "";
            this.commentData.nickname = "";
            this.commentData.email = "";
            this.loading = false;
        }
    },
    methods: {
        getArticleData(aid) {
            this.$store.dispatch("getArticleDataAction", aid);
        },
        getCommentData(aid) {
            this.$store.dispatch("getCommentDataAction", aid);
        },
        addComment() {
            this.commentData.aid = this.$route.params.id;
            this.$store.dispatch("addCommentAction", this.commentData);
        }
    },
    mounted() {
        this.getArticleData(this.$route.params.id);
        this.getCommentData(this.$route.params.id);
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
    text-align: left;
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
    text-align: left;
}
.article-tags span {
    line-height: 50px;
    display: inline-block;
}
.article-tags span + span::before {
    content: " • ";
    margin-left: 5px;
}
.article-footer {
    display: flex;
    margin-top: 20px;
}
.article-footer div {
    height: 100px;
    flex: 1;
}
.article-previous {
    background-color: aquamarine;
}
.article-next {
    background-color: rgb(226, 4, 255);
}
.comments {
    padding: 15px;
    margin: 0 auto;
    text-align: left;
    width: 700px;
}
.comments ul li {
    margin-bottom: 20px;
}
.add-comment {
    margin: 0 auto;
    width: 700px;
    padding: 15px;
}
.category {
    color: #2c3e50;
}
.category + .category::before {
    content: " • ";
}
</style>
