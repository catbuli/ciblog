<template>
    <div id="Article">
        <!-- <headEle></headEle> -->
        <article>
            <div class="article-header">
                <h2 class="article-title"
                    v-text="article.title"></h2>
                <div class="article-meta">
                    <span class="article-meta-label iconfont iconpushpin">{{article.pv}}次阅读</span>
                    <span class="article-meta-label iconfont iconpushpin">
                        <a href=""
                           class="category"
                           v-for="category in article.category"
                           :key="category.cid">{{category.name}}</a></span>
                    <span class="article-meta-label iconfont iconpushpin">{{article.create_date}}</span>
                </div>
            </div>
            <div class="article-body">
                <div class="article-content"
                     v-html="article.html">
                </div>
                <div class="article-other">other</div>
                <div class="article-update">update</div>
            </div>
            <div class="article-tags">
                <span v-for="item in article.tag"
                      :key="item.cid"><i class="el-icon-collection-tag">{{item.name}}</i></span>
            </div>
            <div class="article-footer">
                <div class="article-previous">ssss</div>
                <div class="article-next">aaaa</div>
            </div>
        </article>
        <div class="comments">
            <span class="response">
                <p>
                    <i class="el-icon-chat-line-square"> {{commentList.length}} 条评论 </i>
                </p>
            </span>
            <ul>
                <transition-group name="comment">
                    <li v-for="item in commentList"
                        :key="item.cid">
                        <div class="comment-left">
                            <el-avatar class="comment-avatar"
                                       shape="square"
                                       size="large"
                                       :src='item.avatar_url'
                                       @click.native="changeAvatar"></el-avatar>
                        </div>
                        <div class="comment-content">
                            <div class="comment-text">{{item.content}}</div>
                            <p class="comment-meta">
                                By <span v-text="item.nickname"></span>
                                at <span v-text="item.create_date"></span>
                            </p>
                        </div>
                    </li>
                </transition-group>
            </ul>
        </div>
        <div class="add-comment">
            <i class="el-icon-edit-outline title">新增评论</i>
            <el-form ref="form"
                     :model="commentData"
                     :rules="rules"
                     status-icon>
                <el-row>
                    <el-col :span=10>
                        <el-form-item prop="nickname">
                            <el-input v-model="commentData.nickname"
                                      label="用户名"
                                      prefix-icon="el-icon-user"
                                      placeholder="姓名（必须）"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=4
                            align="center">
                        <el-avatar class="avatar"
                                   shape="square"
                                   :src='commentData.avatar_url'
                                   @click.native="changeAvatar"
                                   :size="50"></el-avatar>
                    </el-col>
                    <el-col :span=10>
                        <el-form-item prop="email">
                            <el-input v-model="commentData.email"
                                      label="邮箱"
                                      placeholder="邮箱（必须）"
                                      prefix-icon="el-icon-message"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item prop="content">
                    <el-input v-model="commentData.content"
                              resize="none"
                              type="textarea"
                              placeholder="文明留言哦!"
                              maxlength="200"
                              show-word-limit
                              :rows=5></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addComment('form')">发送</el-button>
                </el-form-item>
            </el-form>
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
            article: {},
            commentList: [],
            loading: true,
            commentData: {
                content: "",
                nickname: "",
                email: "",
                avatar_url: ""
            },
            rules: {
                nickname: [
                    {
                        required: true,
                        message: "请输入姓名！",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 15,
                        message: "姓名长度2到10个字符!"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱！",
                        trigger: "blur"
                    },
                    { type: "email", message: "邮箱格式错误!" }
                ],
                content: [
                    {
                        required: true,
                        message: "请输入评论内容！",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    watch: {
        "$store.state.article.article": function() {
            this.article = this.$store.state.article.article;
            this.loading = false;
        },
        "$store.state.comment.comment": function() {
            this.commentList = this.$store.state.comment.comment;
            this.commentData.content = "";
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
        addComment(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.commentData.aid = this.$route.params.id;
                    this.$store.dispatch("addCommentAction", this.commentData);
                } else {
                    return false;
                }
            });
        },
        changeAvatar() {
            this.commentData.avatar_url =
                "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";
        }
    },
    mounted() {
        this.getArticleData(this.$route.params.id);
        this.getCommentData(this.$route.params.id);
    }
};
</script>

<style scoped>
/* 文章主体 */
#Article article {
    border-radius: 10px;
    margin: 0 auto;
    width: 700px;
    background: #ffffff;
    padding: 15px;
    margin-bottom: 30px;
}
/* 文章标题 */
.article-titile {
    text-align: center;
    font-size: 1.5rem;
    margin: 20px auto;
}
/* 文章信息 */
.article-meta {
    text-align: center;
}
.article-meta a {
    color: #2c3e50;
}
.article-meta-label {
    font-size: 16px;
    margin: 0 15px;
}
/* 文章正文 */
.article-content {
    text-align: left;
    font-size: 105%;
    line-height: 1.5rem;
    word-wrap: break-word;
    word-break: break-all;
    border-top: 1px dashed #dadada;
    padding: 20px;
    margin-top: 25px;
}
.article-content >>> h1 {
}
.article-content >>> .hljs-center {
    text-align: center;
}
.article-content >>> .hljs-left {
    text-align: left;
}
.article-content >>> .hljs-right {
    text-align: right;
}
/* 文章更新时间 */
.article-update {
    border-bottom: 1px dashed #dadada;
}
/* 文章标签 */
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
/* 文章翻页 */
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
/* 评论列表 */
.response {
    padding: 20px 0;
    display: block;
    border-top: 1px solid #8e8d8d;
    position: relative;
}
.response p {
    font-size: 30px;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    padding: 0 40px;
    position: absolute;
    left: 50%;
    top: 0;
    background-color: #f2f2f2;
}
.comments {
    padding: 15px;
    margin: 0 auto;
    text-align: left;
    width: 700px;
}
.comments ul li {
    margin-bottom: 20px;
    display: flex;
}
.comment-left {
    width: 15%;
}
.comment-content {
    /* position: relative; */
    width: 80%;
    /* right: 0; */
}
.comment-text {
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    position: relative;
}
.comment-text:before {
    content: "";
    position: absolute;
    top: 13px;
    left: -6px;
    width: 10px;
    height: 10px;
    border-width: 0 0 1px 1px;
    border-style: solid;
    background-color: #fff;
    border-color: #e5e5e5;
    transform: rotate(45deg);
}
.comment-meta span:first-child {
    background-color: #dfdddd;
    display: inline-block;
    padding: 3px 8px;
    border-radius: 5px;
}
.comment .comment-avatar {
    position: relative;
    left: 40px;
}

/* 添加评论 */
.add-comment {
    margin: 0 auto;
    width: 700px;
    padding: 15px;
    text-align: left;
}
.add-comment .title {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 20px;
}
.add-comment p {
    line-height: 40px;
    text-align: right;
}
.add-comment .avatar {
    position: relative;
    top: -10px;
    cursor: pointer;
}
/* 分类信息 */
.category {
    color: #2c3e50;
}
.category + .category::before {
    content: " • ";
}
/* 评论新增动画 */
.comment-enter {
    transform: translateX(100%);
    /* transform: scale(0.3); */
    opacity: 0.3;
}
.comment-enter-active {
    transition: all 1s ease;
}
.comment-enter-to {
    transform: translateX(0);
    /* transform: scale(1); */
    opacity: 1;
}
</style>
