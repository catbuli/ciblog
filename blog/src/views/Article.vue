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
.article-content >>> ul li {
    list-style: decimal;
}
.article-content >>> ol li {
    list-style: disc;
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
.comment-left .comment-avatar {
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

<style scoped>
@font-face {
    font-family: octicons-link;
    src: url(data:font/woff;charset=utf-8;base64,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)
        format("woff");
}

.article-content >>> .octicon {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-bottom;
}

.article-content >>> .anchor {
    float: left;
    line-height: 1;
    margin-left: -20px;
    padding-right: 4px;
}

.article-content >>> .anchor:focus {
    outline: none;
}

.article-content >>> h1 .octicon-link,
.article-content >>> h2 .octicon-link,
.article-content >>> h3 .octicon-link,
.article-content >>> h4 .octicon-link,
.article-content >>> h5 .octicon-link,
.article-content >>> h6 .octicon-link {
    color: #1b1f23;
    vertical-align: middle;
    visibility: hidden;
}

.article-content >>> h1:hover .anchor,
.article-content >>> h2:hover .anchor,
.article-content >>> h3:hover .anchor,
.article-content >>> h4:hover .anchor,
.article-content >>> h5:hover .anchor,
.article-content >>> h6:hover .anchor {
    text-decoration: none;
}

.article-content >>> h1:hover .anchor .octicon-link,
.article-content >>> h2:hover .anchor .octicon-link,
.article-content >>> h3:hover .anchor .octicon-link,
.article-content >>> h4:hover .anchor .octicon-link,
.article-content >>> h5:hover .anchor .octicon-link,
.article-content >>> h6:hover .anchor .octicon-link {
    visibility: visible;
}

.article-content >>> {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    color: #24292e;
    line-height: 1.5;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
}

.article-content >>> .pl-c {
    color: #6a737d;
}

.article-content >>> .pl-c1,
.article-content >>> .pl-s .pl-v {
    color: #005cc5;
}

.article-content >>> .pl-e,
.article-content >>> .pl-en {
    color: #6f42c1;
}

.article-content >>> .pl-s .pl-s1,
.article-content >>> .pl-smi {
    color: #24292e;
}

.article-content >>> .pl-ent {
    color: #22863a;
}

.article-content >>> .pl-k {
    color: #d73a49;
}

.article-content >>> .pl-pds,
.article-content >>> .pl-s,
.article-content >>> .pl-s .pl-pse .pl-s1,
.article-content >>> .pl-sr,
.article-content >>> .pl-sr .pl-cce,
.article-content >>> .pl-sr .pl-sra,
.article-content >>> .pl-sr .pl-sre {
    color: #032f62;
}

.article-content >>> .pl-smw,
.article-content >>> .pl-v {
    color: #e36209;
}

.article-content >>> .pl-bu {
    color: #b31d28;
}

.article-content >>> .pl-ii {
    background-color: #b31d28;
    color: #fafbfc;
}

.article-content >>> .pl-c2 {
    background-color: #d73a49;
    color: #fafbfc;
}

.article-content >>> .pl-c2:before {
    content: "^M";
}

.article-content >>> .pl-sr .pl-cce {
    color: #22863a;
    font-weight: 700;
}

.article-content >>> .pl-ml {
    color: #735c0f;
}

.article-content >>> .pl-mh,
.article-content >>> .pl-mh .pl-en,
.article-content >>> .pl-ms {
    color: #005cc5;
    font-weight: 700;
}

.article-content >>> .pl-mi {
    color: #24292e;
    font-style: italic;
}

.article-content >>> .pl-mb {
    color: #24292e;
    font-weight: 700;
}

.article-content >>> .pl-md {
    background-color: #ffeef0;
    color: #b31d28;
}

.article-content >>> .pl-mi1 {
    background-color: #f0fff4;
    color: #22863a;
}

.article-content >>> .pl-mc {
    background-color: #ffebda;
    color: #e36209;
}

.article-content >>> .pl-mi2 {
    background-color: #005cc5;
    color: #f6f8fa;
}

.article-content >>> .pl-mdr {
    color: #6f42c1;
    font-weight: 700;
}

.article-content >>> .pl-ba {
    color: #586069;
}

.article-content >>> .pl-sg {
    color: #959da5;
}

.article-content >>> .pl-corl {
    color: #032f62;
    text-decoration: underline;
}

.article-content >>> details {
    display: block;
}

.article-content >>> summary {
    display: list-item;
}

.article-content >>> a {
    background-color: transparent;
}

.article-content >>> a:active,
.article-content >>> a:hover {
    outline-width: 0;
}

.article-content >>> strong {
    font-weight: inherit;
    font-weight: bolder;
}

.article-content >>> h1 {
    font-size: 2em;
    margin: 0.67em 0;
}

.article-content >>> img {
    border-style: none;
}

.article-content >>> code,
.article-content >>> kbd,
.article-content >>> pre {
    font-family: monospace, monospace;
    font-size: 1em;
}

.article-content >>> hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}

.article-content >>> input {
    font: inherit;
    margin: 0;
}

.article-content >>> input {
    overflow: visible;
}

.article-content >>> [type="checkbox"] {
    box-sizing: border-box;
    padding: 0;
}

.article-content >>> * {
    box-sizing: border-box;
}

.article-content >>> input {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

.article-content >>> a {
    color: #0366d6;
    text-decoration: none;
}

.article-content >>> a:hover {
    text-decoration: underline;
}

.article-content >>> strong {
    font-weight: 600;
}

.article-content >>> hr {
    background: transparent;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
    height: 0;
    margin: 15px 0;
    overflow: hidden;
}

.article-content >>> hr:before {
    content: "";
    display: table;
}

.article-content >>> hr:after {
    clear: both;
    content: "";
    display: table;
}

.article-content >>> table {
    border-collapse: collapse;
    border-spacing: 0;
}

.article-content >>> td,
.article-content >>> th {
    padding: 0;
}

.article-content >>> details summary {
    cursor: pointer;
}

.article-content >>> h1,
.article-content >>> h2,
.article-content >>> h3,
.article-content >>> h4,
.article-content >>> h5,
.article-content >>> h6 {
    margin-bottom: 0;
    margin-top: 0;
}

.article-content >>> h1 {
    font-size: 32px;
}

.article-content >>> h1,
.article-content >>> h2 {
    font-weight: 600;
}

.article-content >>> h2 {
    font-size: 24px;
}

.article-content >>> h3 {
    font-size: 20px;
}

.article-content >>> h3,
.article-content >>> h4 {
    font-weight: 600;
}

.article-content >>> h4 {
    font-size: 16px;
}

.article-content >>> h5 {
    font-size: 14px;
}

.article-content >>> h5,
.article-content >>> h6 {
    font-weight: 600;
}

.article-content >>> h6 {
    font-size: 12px;
}

.article-content >>> p {
    margin-bottom: 10px;
    margin-top: 0;
}

.article-content >>> blockquote {
    margin: 0;
}

.article-content >>> ol,
.article-content >>> ul {
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
}

.article-content >>> ol ol,
.article-content >>> ul ol {
    list-style-type: lower-roman;
}

.article-content >>> ol ol ol,
.article-content >>> ol ul ol,
.article-content >>> ul ol ol,
.article-content >>> ul ul ol {
    list-style-type: lower-alpha;
}

.article-content >>> dd {
    margin-left: 0;
}

.article-content >>> code,
.article-content >>> pre {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
        monospace;
    font-size: 12px;
}

.article-content >>> pre {
    margin-bottom: 0;
    margin-top: 0;
}

.article-content >>> input::-webkit-inner-spin-button,
.article-content >>> input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

.article-content >>> .border {
    border: 1px solid #e1e4e8 !important;
}

.article-content >>> .border-0 {
    border: 0 !important;
}

.article-content >>> .border-bottom {
    border-bottom: 1px solid #e1e4e8 !important;
}

.article-content >>> .rounded-1 {
    border-radius: 3px !important;
}

.article-content >>> .bg-white {
    background-color: #fff !important;
}

.article-content >>> .bg-gray-light {
    background-color: #fafbfc !important;
}

.article-content >>> .text-gray-light {
    color: #6a737d !important;
}

.article-content >>> .mb-0 {
    margin-bottom: 0 !important;
}

.article-content >>> .my-2 {
    margin-bottom: 8px !important;
    margin-top: 8px !important;
}

.article-content >>> .pl-0 {
    padding-left: 0 !important;
}

.article-content >>> .py-0 {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
}

.article-content >>> .pl-1 {
    padding-left: 4px !important;
}

.article-content >>> .pl-2 {
    padding-left: 8px !important;
}

.article-content >>> .py-2 {
    padding-bottom: 8px !important;
    padding-top: 8px !important;
}

.article-content >>> .pl-3,
.article-content >>> .px-3 {
    padding-left: 16px !important;
}

.article-content >>> .px-3 {
    padding-right: 16px !important;
}

.article-content >>> .pl-4 {
    padding-left: 24px !important;
}

.article-content >>> .pl-5 {
    padding-left: 32px !important;
}

.article-content >>> .pl-6 {
    padding-left: 40px !important;
}

.article-content >>> .f6 {
    font-size: 12px !important;
}

.article-content >>> .lh-condensed {
    line-height: 1.25 !important;
}

.article-content >>> .text-bold {
    font-weight: 600 !important;
}

.markdown-body:before {
    content: "";
    display: table;
}

.markdown-body:after {
    clear: both;
    content: "";
    display: table;
}

.article-content > :first-child {
    margin-top: 0 !important;
}

.article-content > :last-child {
    margin-bottom: 0 !important;
}

.article-content >>> a:not([href]) {
    color: inherit;
    text-decoration: none;
}

.article-content >>> blockquote,
.article-content >>> dl,
.article-content >>> ol,
.article-content >>> p,
.article-content >>> pre,
.article-content >>> table,
.article-content >>> ul {
    margin-bottom: 16px;
    margin-top: 0;
}

.article-content >>> hr {
    background-color: #e1e4e8;
    border: 0;
    height: 0.25em;
    margin: 24px 0;
    padding: 0;
}

.article-content >>> blockquote {
    border-left: 0.25em solid #dfe2e5;
    color: #6a737d;
    padding: 0 1em;
}

.article-content >>> blockquote > :first-child {
    margin-top: 0;
}

.article-content >>> blockquote > :last-child {
    margin-bottom: 0;
}

.article-content >>> kbd {
    background-color: #fafbfc;
    border: 1px solid #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5;
    color: #444d56;
    display: inline-block;
    font-size: 11px;
    line-height: 10px;
    padding: 3px 5px;
    vertical-align: middle;
}

.article-content >>> h1,
.article-content >>> h2,
.article-content >>> h3,
.article-content >>> h4,
.article-content >>> h5,
.article-content >>> h6 {
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 16px;
    margin-top: 24px;
}

.article-content >>> h1 {
    font-size: 2em;
}

.article-content >>> h1,
.article-content >>> h2 {
    border-bottom: 1px solid #eaecef;
    padding-bottom: 0.3em;
}

.article-content >>> h2 {
    font-size: 1.5em;
}

.article-content >>> h3 {
    font-size: 1.25em;
}

.article-content >>> h4 {
    font-size: 1em;
}

.article-content >>> h5 {
    font-size: 0.875em;
}

.article-content >>> h6 {
    color: #6a737d;
    font-size: 0.85em;
}

.article-content >>> ol,
.article-content >>> ul {
    padding-left: 2em;
}

.article-content >>> ol ol,
.article-content >>> ol ul,
.article-content >>> ul ol,
.article-content >>> ul ul {
    margin-bottom: 0;
    margin-top: 0;
}

.article-content >>> li {
    word-wrap: break-all;
}

.article-content >>> li > p {
    margin-top: 16px;
}

.article-content >>> li + li {
    margin-top: 0.25em;
}

.article-content >>> dl {
    padding: 0;
}

.article-content >>> dl dt {
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
    margin-top: 16px;
    padding: 0;
}

.article-content >>> dl dd {
    margin-bottom: 16px;
    padding: 0 16px;
}

.article-content >>> table {
    display: block;
    overflow: auto;
    width: 100%;
}

.article-content >>> table th {
    font-weight: 600;
}

.article-content >>> table td,
.article-content >>> table th {
    border: 1px solid #dfe2e5;
    padding: 6px 13px;
}

.article-content >>> table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
}

.article-content >>> table tr:nth-child(2n) {
    background-color: #f6f8fa;
}

.article-content >>> img {
    background-color: #fff;
    box-sizing: content-box;
    max-width: 100%;
}

.article-content >>> img[align="right"] {
    padding-left: 20px;
}

.article-content >>> img[align="left"] {
    padding-right: 20px;
}

.article-content >>> code {
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    padding: 0.2em 0.4em;
}

.article-content >>> pre {
    word-wrap: normal;
}

.article-content >>> pre > code {
    background: transparent;
    border: 0;
    font-size: 100%;
    margin: 0;
    padding: 0;
    white-space: pre;
    word-break: normal;
}

.article-content >>> .highlight {
    margin-bottom: 16px;
}

.article-content >>> .highlight pre {
    margin-bottom: 0;
    word-break: normal;
}

.article-content >>> .highlight pre,
.article-content >>> pre {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
}

.article-content >>> pre code {
    background-color: transparent;
    border: 0;
    display: inline;
    line-height: inherit;
    margin: 0;
    max-width: auto;
    overflow: visible;
    padding: 0;
    word-wrap: normal;
}

.article-content >>> .commit-tease-sha {
    color: #444d56;
    display: inline-block;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
        monospace;
    font-size: 90%;
}

.article-content >>> .blob-wrapper {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    overflow-x: auto;
    overflow-y: hidden;
}

.article-content >>> .blob-wrapper-embedded {
    max-height: 240px;
    overflow-y: auto;
}

.article-content >>> .blob-num {
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    color: rgba(27, 31, 35, 0.3);
    cursor: pointer;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
        monospace;
    font-size: 12px;
    line-height: 20px;
    min-width: 50px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: right;
    user-select: none;
    vertical-align: top;
    white-space: nowrap;
    width: 1%;
}

.article-content >>> .blob-num:hover {
    color: rgba(27, 31, 35, 0.6);
}

.article-content >>> .blob-num:before {
    content: attr(data-line-number);
}

.article-content >>> .blob-code {
    line-height: 20px;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    vertical-align: top;
}

.article-content >>> .blob-code-inner {
    color: #24292e;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
        monospace;
    font-size: 12px;
    overflow: visible;
    white-space: pre;
    word-wrap: normal;
}

.article-content >>> .pl-token.active,
.article-content >>> .pl-token:hover {
    background: #ffea7f;
    cursor: pointer;
}

.article-content >>> kbd {
    background-color: #fafbfc;
    border: 1px solid #d1d5da;
    border-bottom-color: #c6cbd1;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #c6cbd1;
    color: #444d56;
    display: inline-block;
    font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
        monospace;
    line-height: 10px;
    padding: 3px 5px;
    vertical-align: middle;
}

.article-content >>> :checked + .radio-label {
    border-color: #0366d6;
    position: relative;
    z-index: 1;
}

.article-content >>> .tab-size[data-tab-size="1"] {
    -moz-tab-size: 1;
    tab-size: 1;
}

.article-content >>> .tab-size[data-tab-size="2"] {
    -moz-tab-size: 2;
    tab-size: 2;
}

.article-content >>> .tab-size[data-tab-size="3"] {
    -moz-tab-size: 3;
    tab-size: 3;
}

.article-content >>> .tab-size[data-tab-size="4"] {
    -moz-tab-size: 4;
    tab-size: 4;
}

.article-content >>> .tab-size[data-tab-size="5"] {
    -moz-tab-size: 5;
    tab-size: 5;
}

.article-content >>> .tab-size[data-tab-size="6"] {
    -moz-tab-size: 6;
    tab-size: 6;
}

.article-content >>> .tab-size[data-tab-size="7"] {
    -moz-tab-size: 7;
    tab-size: 7;
}

.article-content >>> .tab-size[data-tab-size="8"] {
    -moz-tab-size: 8;
    tab-size: 8;
}

.article-content >>> .tab-size[data-tab-size="9"] {
    -moz-tab-size: 9;
    tab-size: 9;
}

.article-content >>> .tab-size[data-tab-size="10"] {
    -moz-tab-size: 10;
    tab-size: 10;
}

.article-content >>> .tab-size[data-tab-size="11"] {
    -moz-tab-size: 11;
    tab-size: 11;
}

.article-content >>> .tab-size[data-tab-size="12"] {
    -moz-tab-size: 12;
    tab-size: 12;
}

.article-content >>> .task-list-item {
    list-style-type: none;
}

.article-content >>> .task-list-item + .task-list-item {
    margin-top: 3px;
}

.article-content >>> .task-list-item input {
    margin: 0 0.2em 0.25em -1.6em;
    vertical-align: middle;
}

.article-content >>> hr {
    border-bottom-color: #eee;
}

.article-content >>> .pl-0 {
    padding-left: 0 !important;
}

.article-content >>> .pl-1 {
    padding-left: 4px !important;
}

.article-content >>> .pl-2 {
    padding-left: 8px !important;
}

.article-content >>> .pl-3 {
    padding-left: 16px !important;
}

.article-content >>> .pl-4 {
    padding-left: 24px !important;
}

.article-content >>> .pl-5 {
    padding-left: 32px !important;
}

.article-content >>> .pl-6 {
    padding-left: 40px !important;
}

.article-content >>> .pl-7 {
    padding-left: 48px !important;
}

.article-content >>> .pl-8 {
    padding-left: 64px !important;
}

.article-content >>> .pl-9 {
    padding-left: 80px !important;
}

.article-content >>> .pl-10 {
    padding-left: 96px !important;
}

.article-content >>> .pl-11 {
    padding-left: 112px !important;
}

.article-content >>> .pl-12 {
    padding-left: 128px !important;
}
</style>