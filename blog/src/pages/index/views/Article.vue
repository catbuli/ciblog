<template>
    <div id="Article"
         class="index-frame">
        <headEle height="60%"
                 :backgroundImage="'url('+article.cover_url+')'"></headEle>
        <div class="element-frame">
            <article v-loading="loading">
                <div class="article-header">
                    <h2 class="article-title"
                        v-text="article.title"></h2>
                    <div class="article-meta">
                        <span class="article-meta-label iconfont iconpushpin">{{article.pv}}次阅读</span>
                        <span class="article-meta-label iconfont iconpushpin">
                            <a class="category"
                               :href="`/search/category/${category.mid}`"
                               target="_blank"
                               v-for="category in article.category"
                               :key="category.mid">{{category.name}}</a>
                        </span>
                        <span class="article-meta-label iconfont iconpushpin">{{article.create_date|handleDate}}</span>
                    </div>
                </div>
                <div class="article-body">
                    <div class="markdown-body"
                         v-html="article.html">
                    </div>
                    <div class="article-other"></div>
                    <div class="article-update">
                        <i class="el-icon-time">最后更新于：{{article.modify_date|handleDate}}</i>
                    </div>
                </div>
                <div class="article-tags">
                    <a v-for="item in article.tag"
                       class="el-icon-collection-tag"
                       :key="item.mid"
                       :href="`/search/tag/${item.mid}`"
                       target="_blank">
                        {{item.name}}
                    </a>
                </div>
                <div class="article-footer">
                    <div class="article-previous"
                         v-if="previous">
                        <a @click="jump(previous.aid)">
                            <span>{{previous.title}}</span>
                            <span>上一篇</span>
                            <img :src="previous.cover_url"
                                 title="上一篇">
                        </a>
                    </div>
                    <div class="article-next"
                         v-if="next">
                        <a @click="jump(next.aid)">
                            <span>{{next.title}}</span>
                            <span>下一篇</span>
                            <img :src="next.cover_url"
                                 title="下一篇">
                        </a>
                    </div>
                </div>
            </article>
            <div class="comments"
                 ref="comments">
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
                                <Gravatar :email="item.email"
                                          :class="!JSON.parse(item.reply)?'comment-avatar':'comment-avatar-child'"
                                          :size="!JSON.parse(item.reply)?45:30"></Gravatar>
                            </div>
                            <div class="comment-content">
                                <i class="el-icon-chat-line-square comment-reply"
                                   @click="reply(item,$event)"></i>
                                <div class="comment-text">
                                    <p class="reply"
                                       v-if="item.reply">
                                        <span>@{{JSON.parse(item.reply).nickname}}</span>
                                    </p>
                                    <p class="text">{{item.content}}</p>
                                </div>
                                <p class="comment-meta">
                                    By <span v-text="item.nickname"></span>
                                    at <span v-text="item.create_date"></span>
                                </p>
                            </div>
                        </li>
                    </transition-group>
                </ul>
            </div>
            <animationFrame className="circular-diffusion">
                <div class="add-comment"
                     v-if="$store.state.global.system.comment_is_allow"
                     ref="addComment">
                    <i class="el-icon-edit-outline title">{{commentMessage}}</i>
                    <span class="clear-reply"
                          v-show="isReply"
                          @click="clearReply">取消</span>
                    <el-form ref="form"
                             :model="commentData"
                             :rules="rules"
                             status-icon>
                        <el-row>
                            <el-col :span="style.isPC?10:24"
                                    class="username">
                                <el-form-item prop="nickname">
                                    <el-input v-model="commentData.nickname"
                                              label="用户名"
                                              prefix-icon="el-icon-user"
                                              placeholder="姓名（必须）"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="style.isPC?4:0"
                                    class="avatar"
                                    align="center">
                                <el-avatar class="avatar"
                                           shape="square"
                                           src='https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
                                           :size="50"></el-avatar>
                            </el-col>
                            <el-col :span="style.isPC?10:24"
                                    class="email">
                                <el-form-item prop="email">
                                    <el-input v-model="commentData.email"
                                              label="邮箱"
                                              placeholder="邮箱（必须）"
                                              prefix-icon="el-icon-message"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item prop="content"
                                      class="content">
                            <el-input v-model="commentData.content"
                                      id="input"
                                      resize="none"
                                      ref="input"
                                      type="textarea"
                                      placeholder="文明留言哦!"
                                      maxlength="200"
                                      show-word-limit
                                      :rows=5></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span=3>
                                <QAQ input="input"></QAQ>
                            </el-col>
                            <el-col :span=21>
                                <el-button style="float:right"
                                           @click="addComment('form')">发送</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="message"
                     v-else>
                    <p>评论功能已关闭</p>
                </div>
            </animationFrame>
        </div>
        <footEle></footEle>
    </div>
</template>

<script>
// @ is an alias to /src
import footEle from "@/components/common/footEle.vue";
import animationFrame from "@/components/common/animationFrame.vue";
import headEle from "../components/headEle.vue";
import QAQ from "@/components/miniTools/QAQ.vue";
import Axios from "axios";
import Gravatar from "vue-gravatar";

export default {
    name: "home",
    components: {
        headEle,
        footEle,
        Gravatar,
        animationFrame,
        QAQ
    },
    data() {
        return {
            loading: true,
            isReply: false,
            anchor: 0,
            commentMessage: "新增评论",
            commentData: {
                content: "",
                nickname: "",
                email: "",
                avatar_url: "",
                reply: {}
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
            },
            paging: {
                pageSize: 10,
                currentPage: 1,
                type: 0,
                typeName: "aid",
                total: 0
            }
        };
    },
    filters: {
        handleDate(value) {
            if (value) return value.split(" ")[0];
        }
    },
    computed: {
        style() {
            return this.$store.getters.globalStyle;
        },
        commentList() {
            let commentList = this.$store.state.comment.commentList;
            let father = [];
            let son = [];
            commentList.forEach((element, index) => {
                if (!element.reply) {
                    father.push(element);
                } else {
                    son.push(element);
                }
            });
            son.reverse().forEach((element, index) => {
                father.find(function(val, indext) {
                    if (val.cid == JSON.parse(element.reply).cid) {
                        father.splice(indext + 1, 0, element);
                    }
                });
            });
            return father;
        },
        article() {
            let tag = this.$store.state.article.article.tag;
            if (tag) {
                if (tag.length == 0) {
                    this.$store.state.article.article.tag = [{ name: "None" }];
                }
            }
            return this.$store.state.article.article;
        },
        previous() {
            return this.$store.state.article.previous;
        },
        next() {
            return this.$store.state.article.next;
        }
    },
    watch: {
        "$store.state.article.article": function() {
            document.title =
                this.article.title +
                "-" +
                this.$store.state.global.system.web_name;
            this.loading = false;
        },
        "$store.state.comment.commentList": function() {
            this.commentData.content = "";
            this.clearReply();
        },
        $route: function(to, form) {
            this.loading = true;
            this.getArticleData(this.$route.params.id);
            this.getCommentList(this.$route.params.id);
        }
    },
    methods: {
        getArticleData(aid) {
            this.$store.dispatch("getArticleIndexAction", aid);
        },
        getCommentList(aid) {
            this.paging.type = aid;
            this.$store.dispatch("getCommentListAction", this.paging);
        },
        addComment(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.commentData.aid = this.$route.params.id;
                    this.$store.dispatch("addCommentAction", this.commentData);
                    if (!this.isReply) {
                        this.anchor = this.$refs.comments.offsetTop - 30;
                    }
                    scrollTo(0, this.anchor);
                } else {
                    return false;
                }
            });
        },
        reply(data, node) {
            this.anchor = node.pageY - 20;
            scrollTo(0, this.$refs.addComment.offsetTop);
            this.isReply = true;
            this.commentMessage = "回复 " + data.nickname;
            this.commentData.reply = {
                cid: data.cid,
                nickname: data.nickname
            };
        },
        clearReply() {
            this.isReply = false;
            this.commentMessage = "新增评论";
            this.commentData.reply = {};
        },
        jump(aid) {
            this.$router.push({
                path: `/article/${aid}`
            });
        }
    },
    mounted() {
        this.loading = true;
        this.getArticleData(this.$route.params.id);
        this.getCommentList(this.$route.params.id);
    },
    destroyed() {}
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/markdown.css";
/* 媒体查询 */
@media screen and (max-width: 1200px) {
} /* 大型设备（大台式电脑，1200px 起） */

@media screen and (max-width: 992px) {
} /* 中型设备（台式电脑，992px 起） */

@media screen and (max-width: 768px) {
} /* 小型设备（平板电脑，768px 起） */

@media screen and (max-width: 480px) {
    .article-footer {
        height: 100px !important;
        img {
            height: 100px !important;
        }
        div {
            span {
                top: 25px !important;
            }
            span:nth-of-type(2) {
                top: 45px !important;
            }
        }
    }
    .comments {
        .response {
            p {
                font-size: 1.1rem !important;
            }
        }
        ul {
            width: 100%;
            .comment-left {
                width: 20% !important;
            }
            .comment-content {
                width: 80% !important;
            }
            .article-meta-label {
                min-width: 100%;
                margin: 0.1rem auto !important;
            }
        }
    }
} /* 超小设备（手机，小于 480px） */

#Article {
    transition: all 1s ease;
    position: absolute;
    // 文章主体
    article {
        position: relative;
        border-radius: 10px;
        margin: 0 auto;
        width: 90%;
        background: #ffffff;
        padding: 15px;
        // 文章头部
        .article-header {
            // 文章标题
            .article-titile {
                text-align: center;
                font-size: 1.5rem;
                margin: 20px auto;
            }
            // 文章信息
            .article-meta {
                text-align: center;
                display: flex;
                flex-wrap: wrap;
                .article-meta-label {
                    flex: 1;
                    font-size: 16px;
                    margin: 0 15px;
                    // 分类信息
                    .category {
                        color: #2c3e50;
                        user-select: none;
                    }
                    .category + .category::before {
                        content: " • ";
                    }
                }
            }
        }
        // 文章正文
        .article-body {
            // markdown主体
            .markdown-body {
                text-align: left;
                font-size: 105%;
                line-height: 1.5rem;
                word-wrap: break-word;
                word-break: break-all;
                border-top: 1px dashed #dadada;
                padding: 20px;
                margin-top: 25px;
                margin-bottom: 40px;
            }
            .markdown-body /deep/ ul li {
                list-style: decimal;
            }
            .markdown-body /deep/ ol li {
                list-style: disc;
            }
            //  文章更新时间
            .article-update {
                border-bottom: 1px dashed #dadada;
                text-align: right;
                line-height: 20px;
            }
            .article-update i {
                color: #727272;
                margin-bottom: 10px;
            }
        }
        // 文章标签
        .article-tags {
            height: 50px;
            border-bottom: 1px dashed #dadada;
            text-align: left;
            a {
                line-height: 50px;
                display: inline-block;
            }
            a + a::before {
                content: " • ";
                margin-left: 5px;
            }
        }
        // 文章翻页
        .article-footer {
            display: flex;
            margin-top: 20px;
            cursor: pointer;
            div {
                height: 100%;
                position: relative;
                flex: 1;
                img {
                    width: 100%;
                    height: 150px;
                    filter: brightness(0.5);
                    /* opacity: 0.3; */
                    transition: all ease 0.3s;
                    object-fit: cover;
                }
                img:hover {
                    filter: brightness(1);
                }
                span {
                    width: 70%;
                    left: 15%;
                    top: 50px;
                    display: inline-block;
                    position: absolute;
                    z-index: 20;
                    color: #fff;
                }
                span:nth-of-type(2) {
                    width: 70%;
                    left: 15%;
                    top: 75px;
                    display: inline-block;
                    position: absolute;
                    z-index: 20;
                    color: #fff;
                }
            }
        }
    }
    // 评论列表
    .comments {
        overflow: hidden;
        padding: 60px 0px 15px;
        margin: 0 auto;
        text-align: left;
        width: 94%;
        // border-bottom: 1px solid #ddd;
        .response {
            padding: 30px 0;
            display: block;
            border-top: 1px solid #8e8d8d;
            position: relative;
            p {
                font-weight: 500;
                display: inline;
                text-align: center;
                font-size: 1.5rem;
                transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                -moz-transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%);
                -o-transform: translate(-50%, -50%);
                margin: 0 auto;
                padding: 0 30px;
                position: absolute;
                left: 50%;
                top: 0;
                background-color: #f2f2f2;
            }
        }
        ul {
            width: 95%;
            margin: 0 auto;
            li {
                margin-bottom: 20px;
                display: flex;
                width: 100%;
                .comment-left {
                    width: 10%;
                    .comment-avatar {
                        border-radius: 7px;
                        position: relative;
                    }
                    .comment-avatar-child {
                        border-radius: 7px;
                        position: relative;
                        left: 15px;
                    }
                }
                .comment-content {
                    position: relative;
                    width: 90%;
                    .comment-reply {
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        font-size: 20px;
                        z-index: 100;
                        cursor: pointer;
                    }
                    .comment-text {
                        padding: 10px 40px 10px 10px;
                        border: 1px solid #e5e5e5;
                        border-radius: 5px;
                        background: #fff;
                        box-sizing: border-box;
                        width: 100%;
                        margin-bottom: 10px;
                        position: relative;
                        .text {
                            display: inline;
                            word-wrap: break-word;
                        }
                        .reply {
                            display: block;
                            margin-bottom: 10px;
                            span {
                                background-color: #dfdddd;
                                padding: 3px 8px;
                                border-radius: 5px;
                                font-size: 10px;
                            }
                        }
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
                        -ms-transform: rotate(45deg);
                        -moz-transform: rotate(45deg);
                        -webkit-transform: rotate(45deg);
                        -o-transform: rotate(45deg);
                    }
                    .comment-meta span:first-child {
                        background-color: #dfdddd;
                        display: inline-block;
                        padding: 3px 8px;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
    // 添加评论
    .add-comment {
        margin: 0 auto;
        width: 94%;
        padding: 15px;
        text-align: left;
        .clear-reply {
            cursor: pointer;
            float: right;
            padding: 5px;
        }
        .title {
            font-size: 22px;
            font-weight: 500;
            margin-bottom: 20px;
        }
        p {
            line-height: 40px;
            text-align: right;
        }
        .avatar {
            position: relative;
            top: -10px;
        }
    }
}

/* 评论功能提示信息 */
.message {
    height: 100px;
    width: 700px;
    margin: 0 auto;
}
.message p {
    text-align: center;
    position: relative;
    top: 30px;
}
/* 评论新增动画 */
.comment-enter {
    transform: translateX(100%);
    -ms-transform: translateX(100%);
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    -o-transform: translateX(100%);
    opacity: 0.3;
}
.comment-enter-active {
    transition: all 1s ease;
}
.comment-enter-to {
    transform: translateX(0);
    -ms-transform: translateX(0);
    -moz-transform: translateX(0);
    -webkit-transform: translateX(0);
    -o-transform: translateX(0);
    opacity: 1;
}
</style>
