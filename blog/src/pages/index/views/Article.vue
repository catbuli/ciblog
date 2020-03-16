<template>
    <div id="Article"
         :key="$route.fullPath">
        <headEle height="60%"
                 :isShowInfo="false"
                 :backgroundImage="'url('+article.cover_url+')'"></headEle>
        <article v-loading="loading">
            <div class="article-header">
                <h2 class="article-title"
                    v-text="article.title"></h2>
                <div class="article-meta">
                    <span class="article-meta-label iconfont iconpushpin">{{article.pv}}次阅读</span>
                    <span class="article-meta-label iconfont iconpushpin">
                        <a class="category"
                           style="cursor: pointer"
                           v-for="category in article.category"
                           @click="categoryJump(category.name,category.mid)"
                           :key="category.mid">{{category.name}}</a>
                    </span>
                    <span class="article-meta-label iconfont iconpushpin">{{article.create_date}}</span>
                </div>
            </div>
            <div class="article-body">
                <div class="markdown-body"
                     v-html="article.html">
                </div>
                <div class="article-other"></div>
                <div class="article-update">
                    <i class="el-icon-time">最后更新于：{{article.modify_date}}</i>
                </div>
            </div>
            <div class="article-tags">
                <span v-for="item in article.tag"
                      :key="item.mid"
                      style="cursor:pointer"
                      @click="tagJump(item.name,item.mid)"><i class="el-icon-collection-tag">{{item.name}}</i></span>
            </div>
            <div class="article-footer">
                <div class="article-previous"
                     v-if="previous">
                    <a @click="jump(previous.aid)">
                        <span>{{previous.title}}</span>
                        <img :src="previous.cover_url"
                             alt="上一篇">
                    </a>
                </div>
                <div class="article-next"
                     v-if="next">
                    <a @click="jump(next.aid)">
                        <span>{{next.title}}</span>
                        <img :src="next.cover_url"
                             alt="下一篇">
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
                                      class="comment-avatar"
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
        <div class="add-comment"
             v-if="$store.state.global.system.comment_is_allow"
             ref="commentTop">
            <i class="el-icon-edit-outline title">{{commentMessage}}</i>
            <span class="clear-reply"
                  v-show="isReply"
                  @click="clearReply">取消</span>
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
                                   src='https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
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
        <footEle></footEle>
        <backTop></backTop>
    </div>
</template>

<script>
// @ is an alias to /src
import footEle from "@/components/common/footEle.vue";
import headEle from "@/components/common/headEle.vue";
import backTop from "@/components/common/backTop.vue";
import QAQ from "@/components/miniTools/QAQ.vue";
import Axios from "axios";
import Gravatar from "vue-gravatar";

export default {
    name: "home",
    components: {
        headEle,
        footEle,
        backTop,
        Gravatar,
        QAQ
    },
    data() {
        return {
            // commentList: [],
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
    computed: {
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
            let category = this.$store.state.article.article.category;
            if (category) {
                if (category.length == 0) {
                    this.$store.state.article.article.category = [
                        { name: "暂无分类" }
                    ];
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
            this.article.modify_date = this.article.modify_date.split(" ")[0];
            document.title =
                this.article.title +
                "-" +
                this.$store.state.global.system.web_name;
            this.loading = false;
        },
        "$store.state.comment.commentList": function() {
            this.commentData.content = "";
            this.loading = false;
            this.clearReply();
        },
        $route: function(to, form) {
            // this.$store.commit("REFRESH", form.path);
            this.getArticleData(this.$route.params.id);
            this.getCommentList(this.$route.params.id);
        }
    },
    methods: {
        getArticleData(aid) {
            this.$store.dispatch("getArticleDataAction", aid);
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
            scrollTo(0, this.$refs.commentTop.offsetTop);
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
        },
        categoryJump(name, mid) {
            if (name && mid) {
                this.$router.push({
                    path: "/search",
                    query: {
                        typeName: "category",
                        type: name,
                        mid: mid
                    }
                });
            }
        },
        tagJump(name, mid) {
            this.$router.push({
                path: "/search",
                query: {
                    typeName: "tag",
                    type: name,
                    mid: mid
                }
            });
        }
    },
    mounted() {
        this.getArticleData(this.$route.params.id);
        this.getCommentList(this.$route.params.id);
    }
};
</script>

<style scoped>
[v-cloak] {
    display: none;
}
/* 文章主体 */
#Article {
    height: 100%;
    position: absolute;
    width: 100%;
}
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
.markdown-body >>> ul li {
    list-style: decimal;
}
.markdown-body >>> ol li {
    list-style: disc;
}
/* 文章更新时间 */
.article-update {
    border-bottom: 1px dashed #dadada;
    text-align: right;
    line-height: 20px;
}
.article-update i {
    color: #727272;
    margin-bottom: 10px;
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
    cursor: pointer;
}
.article-footer div {
    height: 150px;
    flex: 1;
    position: relative;
}
.article-footer div img {
    width: 100%;
    height: 100%;
    filter: brightness(0.5);
    /* opacity: 0.3; */
    transition: all ease 0.3s;
    object-fit: cover;
}
.article-footer div span {
    width: 70%;
    left: 15%;
    top: 50px;
    display: inline-block;
    position: absolute;
    z-index: 20;
    color: #fff;
}
.article-footer div img:hover {
    filter: brightness(1);
}
/* .article-previous {
}
.article-next {
} */
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
    position: relative;
    width: 80%;
}
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
}
.comment-text .text {
    display: inline;
    word-wrap: break-word;
}
.comment-text .reply {
    display: block;
    margin-bottom: 10px;
}
.comment-text .reply span {
    background-color: #dfdddd;
    padding: 3px 8px;
    border-radius: 5px;
    font-size: 10px;
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
.comment-left .comment-avatar {
    border-radius: 7px;
    position: relative;
    left: 40px;
}
.comment-left .comment-avatar-child {
    border-radius: 7px;
    position: relative;
    left: 50px;
}

/* 添加评论 */
.add-comment {
    margin: 0 auto;
    width: 700px;
    padding: 15px;
    text-align: left;
}
.clear-reply {
    cursor: pointer;
    float: right;
    padding: 5px;
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
}
/* 分类信息 */
.category {
    color: #2c3e50;
    user-select: none;
}
.category + .category::before {
    content: " • ";
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

<style>
@font-face {
    font-family: octicons-link;
    src: url(data:font/woff;charset=utf-8;base64,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)
        format("woff");
}

.markdown-body {
    text-align: left;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
    color: #24292e;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
        sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
}

.markdown-body .pl-c {
    color: #969896;
}

.markdown-body .pl-c1,
.markdown-body .pl-s .pl-v {
    color: #0086b3;
}

.markdown-body .pl-e,
.markdown-body .pl-en {
    color: #795da3;
}

.markdown-body .pl-smi,
.markdown-body .pl-s .pl-s1 {
    color: #333;
}

.markdown-body .pl-ent {
    color: #63a35c;
}

.markdown-body .pl-k {
    color: #a71d5d;
}

.markdown-body .pl-s,
.markdown-body .pl-pds,
.markdown-body .pl-s .pl-pse .pl-s1,
.markdown-body .pl-sr,
.markdown-body .pl-sr .pl-cce,
.markdown-body .pl-sr .pl-sre,
.markdown-body .pl-sr .pl-sra {
    color: #183691;
}

.markdown-body .pl-v,
.markdown-body .pl-smw {
    color: #ed6a43;
}

.markdown-body .pl-bu {
    color: #b52a1d;
}

.markdown-body .pl-ii {
    color: #f8f8f8;
    background-color: #b52a1d;
}

.markdown-body .pl-c2 {
    color: #f8f8f8;
    background-color: #b52a1d;
}

.markdown-body .pl-c2::before {
    content: "^M";
}

.markdown-body .pl-sr .pl-cce {
    font-weight: bold;
    color: #63a35c;
}

.markdown-body .pl-ml {
    color: #693a17;
}

.markdown-body .pl-mh,
.markdown-body .pl-mh .pl-en,
.markdown-body .pl-ms {
    font-weight: bold;
    color: #1d3e81;
}

.markdown-body .pl-mq {
    color: #008080;
}

.markdown-body .pl-mi {
    font-style: italic;
    color: #333;
}

.markdown-body .pl-mb {
    font-weight: bold;
    color: #333;
}

.markdown-body .pl-md {
    color: #bd2c00;
    background-color: #ffecec;
}

.markdown-body .pl-mi1 {
    color: #55a532;
    background-color: #eaffea;
}

.markdown-body .pl-mc {
    color: #ef9700;
    background-color: #ffe3b4;
}

.markdown-body .pl-mi2 {
    color: #d8d8d8;
    background-color: #808080;
}

.markdown-body .pl-mdr {
    font-weight: bold;
    color: #795da3;
}

.markdown-body .pl-mo {
    color: #1d3e81;
}

.markdown-body .pl-ba {
    color: #595e62;
}

.markdown-body .pl-sg {
    color: #c0c0c0;
}

.markdown-body .pl-corl {
    text-decoration: underline;
    color: #183691;
}

.markdown-body .octicon {
    display: inline-block;
    vertical-align: text-top;
    fill: currentColor;
}

.markdown-body a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
}

.markdown-body a:active,
.markdown-body a:hover {
    outline-width: 0;
}

.markdown-body strong {
    font-weight: inherit;
}

.markdown-body strong {
    font-weight: bolder;
}

.markdown-body h1 {
    font-size: 2.4em;
    margin: 0.67em 0;
}

.markdown-body img {
    border-style: none;
}

.markdown-body svg:not(:root) {
    overflow: hidden;
}

.markdown-body code,
.markdown-body kbd,
.markdown-body pre {
    font-family: monospace, monospace;
    font-size: 1em;
}

.markdown-body hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}

.markdown-body input {
    font: inherit;
    margin: 0;
}

.markdown-body input {
    overflow: visible;
}

.markdown-body [type="checkbox"] {
    box-sizing: border-box;
    padding: 0;
}

.markdown-body * {
    box-sizing: border-box;
}

.markdown-body input {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

.markdown-body a {
    color: #0366d6;
    text-decoration: none;
}

.markdown-body a:hover {
    text-decoration: underline;
}

.markdown-body strong {
    font-weight: 600;
}

.markdown-body hr {
    height: 0;
    margin: 15px 0;
    overflow: hidden;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
}

.markdown-body hr::before {
    display: table;
    content: "";
}

.markdown-body hr::after {
    display: table;
    clear: both;
    content: "";
}

.markdown-body table {
    border-spacing: 0;
    border-collapse: collapse;
}

.markdown-body td,
.markdown-body th {
    padding: 0;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
    margin-top: 0;
    margin-bottom: 0;
}

.markdown-body h1 {
    font-size: 36px;
    font-weight: 600;
}
.markdown-body h2 {
    font-size: 28px;
    font-weight: 600;
}

.markdown-body h3 {
    font-size: 20px;
    font-weight: 600;
}

.markdown-body h4 {
    font-size: 18px;
    font-weight: 600;
}

.markdown-body h5 {
    font-size: 14px;
    font-weight: 600;
}

.markdown-body h6 {
    font-size: 12px;
    font-weight: 600;
}

.markdown-body p {
    margin-top: 0;
    margin-bottom: 6px;
}

.markdown-body blockquote {
    margin: 0;
}

.markdown-body ul,
.markdown-body ol {
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
}

.markdown-body ol ol,
.markdown-body ul ol {
    list-style-type: lower-roman;
}
.markdown-body ul ul ol,
.markdown-body ul ol ol,
.markdown-body ol ul ol,
.markdown-body ol ol ol {
    list-style-type: lower-alpha;
}

.markdown-body dd {
    margin-left: 0;
}

.markdown-body code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
        monospace;
    font-size: 12px;
}

.markdown-body pre {
    margin-top: 0;
    margin-bottom: 0;
    font: 12px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
        monospace;
}

.markdown-body .octicon {
    vertical-align: text-bottom;
}

.markdown-body .pl-0 {
    padding-left: 0 !important;
}

.markdown-body .pl-1 {
    padding-left: 4px !important;
}

.markdown-body .pl-2 {
    padding-left: 8px !important;
}

.markdown-body .pl-3 {
    padding-left: 16px !important;
}

.markdown-body .pl-4 {
    padding-left: 24px !important;
}

.markdown-body .pl-5 {
    padding-left: 32px !important;
}

.markdown-body .pl-6 {
    padding-left: 40px !important;
}

.markdown-body::before {
    display: table;
    content: "";
}

.markdown-body::after {
    display: table;
    clear: both;
    content: "";
}

.markdown-body > *:first-child {
    margin-top: 0 !important;
}

.markdown-body > *:last-child {
    margin-bottom: 0 !important;
}

.markdown-body a:not([href]) {
    color: inherit;
    text-decoration: none;
}

.markdown-body .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1;
}

.markdown-body .anchor:focus {
    outline: none;
}

.markdown-body blockquote,
.markdown-body ul,
.markdown-body ol,
.markdown-body dl,
.markdown-body table,
.markdown-body pre {
    margin-top: 0;
    margin-bottom: 10px;
}

.markdown-body hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e1e4e8;
    border: 0;
}

.markdown-body blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
}

.markdown-body blockquote > :first-child {
    margin-top: 0;
}

.markdown-body blockquote > :last-child {
    margin-bottom: 0;
}

.markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: solid 1px #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
    margin-top: 20px;
    margin-bottom: 12px;
    font-weight: 600;
    line-height: 1.25;
}

.markdown-body h1 .octicon-link,
.markdown-body h2 .octicon-link,
.markdown-body h3 .octicon-link,
.markdown-body h4 .octicon-link,
.markdown-body h5 .octicon-link,
.markdown-body h6 .octicon-link {
    color: #1b1f23;
    vertical-align: middle;
    visibility: hidden;
}

.markdown-body h1:hover .anchor,
.markdown-body h2:hover .anchor,
.markdown-body h3:hover .anchor,
.markdown-body h4:hover .anchor,
.markdown-body h5:hover .anchor,
.markdown-body h6:hover .anchor {
    text-decoration: none;
}

.markdown-body h1:hover .anchor .octicon-link,
.markdown-body h2:hover .anchor .octicon-link,
.markdown-body h3:hover .anchor .octicon-link,
.markdown-body h4:hover .anchor .octicon-link,
.markdown-body h5:hover .anchor .octicon-link,
.markdown-body h6:hover .anchor .octicon-link {
    visibility: visible;
}

.markdown-body h1 {
    padding-bottom: 0.3em;
    font-size: 2.2em;
    border-bottom: 1px solid #eaecef;
}

.markdown-body h2 {
    padding-bottom: 0.3em;
    font-size: 1.8em;
    border-bottom: 1px solid #eaecef;
}

.markdown-body h3 {
    font-size: 1.5em;
}

.markdown-body h4 {
    font-size: 1.2em;
}

.markdown-body h5 {
    font-size: 16px;
}

.markdown-body h6 {
    font-size: 14px;
    color: #6a737d;
}

.markdown-body ul,
.markdown-body ol {
    padding-left: 2em;
}

.markdown-body ul ul,
.markdown-body ul ol,
.markdown-body ol ol,
.markdown-body ol ul {
    margin-top: 0;
    margin-bottom: 0;
}

.markdown-body li > p {
    margin-top: 16px;
}

.markdown-body li + li {
    margin-top: 0.25em;
}

.markdown-body dl {
    padding: 0;
}

.markdown-body dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
}

.markdown-body dl dd {
    padding: 0 16px;
    margin-bottom: 12px;
}

.markdown-body table {
    display: block;
    width: 100%;
    overflow: auto;
}

.markdown-body table th {
    font-weight: 600;
}

.markdown-body table th,
.markdown-body table td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
}

.markdown-body table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
}

.markdown-body table tr:nth-child(2n) {
    background-color: #f6f8fa;
}

.markdown-body img {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff;
}

.markdown-body code {
    padding: 0;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
}

.markdown-body code::before,
.markdown-body code::after {
    letter-spacing: -0.2em;
    content: "\00a0";
}

.markdown-body pre {
    word-wrap: normal;
}

.markdown-body pre > code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
}

.markdown-body .highlight {
    margin-bottom: 12px;
}

.markdown-body .highlight pre {
    margin-bottom: 0;
    word-break: normal;
}

.markdown-body .highlight pre,
.markdown-body pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    border-radius: 3px;
}

.markdown-body pre code {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
}

.markdown-body pre code::before,
.markdown-body pre code::after {
    content: normal;
}

.markdown-body .full-commit .btn-outline:not(:disabled):hover {
    color: #005cc5;
    border-color: #005cc5;
}

.markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
        monospace;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fcfcfc;
    border: solid 1px #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5;
}

.markdown-body :checked + .radio-label {
    position: relative;
    z-index: 1;
    border-color: #0366d6;
}

.markdown-body .task-list-item {
    list-style-type: none;
}

.markdown-body .task-list-item + .task-list-item {
    margin-top: 3px;
}

.markdown-body .task-list-item input {
    margin: 0 0.2em 0.25em -1.6em;
    vertical-align: middle;
}

.markdown-body hr {
    border-bottom-color: #eee;
}

/* 高亮 */
.markdown-body .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #333;
    background: #f2f3f1;
}

.markdown-body .hljs-comment,
.hljs-quote {
    color: #998;
    font-style: italic;
}

.markdown-body .hljs-keyword,
.hljs-selector-tag,
.hljs-subst {
    color: #333;
    font-weight: bold;
}

.markdown-body .hljs-number,
.hljs-literal,
.hljs-variable,
.hljs-template-variable,
.hljs-tag .hljs-attr {
    color: #008080;
}

.markdown-body .hljs-string,
.hljs-doctag {
    color: #d14;
}

.markdown-body .hljs-title,
.hljs-section,
.hljs-selector-id {
    color: #900;
    font-weight: bold;
}

.markdown-body .hljs-subst {
    font-weight: normal;
}

.markdown-body .hljs-type,
.hljs-class .hljs-title {
    color: #458;
    font-weight: bold;
}

.markdown-body .hljs-tag,
.hljs-name,
.hljs-attribute {
    color: #000080;
    font-weight: normal;
}

.markdown-body .hljs-regexp,
.hljs-link {
    color: #009926;
}

.markdown-body .hljs-symbol,
.hljs-bullet {
    color: #990073;
}

.markdown-body .hljs-built_in,
.hljs-builtin-name {
    color: #0086b3;
}

.markdown-body .hljs-meta {
    color: #999;
    font-weight: bold;
}

.markdown-body .hljs-deletion {
    background: #fdd;
}

.markdown-body .hljs-addition {
    background: #dfd;
}

.markdown-body .hljs-emphasis {
    font-style: italic;
}

.markdown-body .hljs-strong {
    font-weight: bold;
}
</style>