<template>
    <div id="Article">
        <headEle></headEle>
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
                <div class="article-other"></div>
                <div class="article-update"></div>
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
                        <p>{{item.content}}</p>
                        <p>by{{item.nickname}}at{{item.create_date}}</p>
                    </li>
                </transition-group>
            </ul>
        </div>
        <div class="add-comment">
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
                    <el-col :span=4>
                        maomao
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
                              maxlength="30"
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
                email: ""
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
        addComment(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.commentData.aid = this.$route.params.id;
                    this.$store.dispatch("addCommentAction", this.commentData);
                } else {
                    return false;
                }
            });
        }
    },
    mounted() {
        this.getArticleData(this.$route.params.id);
        this.getCommentData(this.$route.params.id);
    }
};
</script>

<style scoped>
/* #Article {
} */
article {
    border-radius: 10px;
    margin: 0 auto;
    width: 700px;
    background: #ffffff;
    padding: 15px;
    margin-bottom: 30px;
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
    text-align: left;
}
.add-comment .title {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 20px;
}
.add-comment p {
    line-height: 40px;
    text-align: right;
}
.category {
    color: #2c3e50;
}
.category + .category::before {
    content: " • ";
}
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
