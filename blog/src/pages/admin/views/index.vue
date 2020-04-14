<template>
    <adminFrame title="总览">
        <div class="index-top">
            <h1>
                一共篇
                <span class="sign">{{countList.articleCount}}</span>
                文章,
                <span class="sign">{{countList.categoryCount}}</span>
                种分类,
                <span class="sign">{{countList.commentCount}}</span>
                条评论
            </h1>
            <p>
                <router-link to="/admin/write_article">写文章</router-link>
                <router-link to="/admin/manage_article">文章管理</router-link>
                <router-link to="/admin/setup_personal">个人设置</router-link>
                <router-link to="/admin/setup_system">系统设置</router-link>
            </p>
        </div>
        <div class="index-bottom">
            <section class="list-one">
                <h3>最新发布的文章</h3>
                <ul>
                    <li v-for="item in articleList"
                        :key="item.aid">
                        <span>{{item.create_date|handleDate}}</span>
                        <a target="_blank"
                           :href="`/article/${item.aid}`">
                            {{item.title}}
                        </a>
                    </li>
                </ul>
            </section>
            <section class="list-two">
                <h3>最新评论</h3>
                <ul>
                    <li v-for="item in commentList"
                        :key="item.cid">
                        <span>{{item.create_date|handleDate}}</span>
                        <a class="index-top-context"
                           target="_blank"
                           :href="`/article/${item.aid}`">
                            {{item.content}}
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    </adminFrame>
</template>

<script>
import adminFrame from "../components/common/adminFrame.vue";
export default {
    name: "index",
    components: {
        adminFrame
    },
    filters: {
        handleDate(value) {
            if (value) {
                return (
                    value.split(" ")[0].split("-")[1] +
                    "-" +
                    value.split(" ")[0].split("-")[2]
                );
            }
        }
    },
    data() {
        return {
            paging: {
                pageSize: 10,
                currentPage: 1,
                type: -1,
                typeName: "all",
                total: 0
            }
        };
    },
    computed: {
        countList() {
            return this.$store.state.global.countList;
        },
        articleList() {
            return this.$store.state.article.articleList;
        },
        commentList() {
            return this.$store.state.comment.commentList;
        }
    },
    created() {
        this.$store.dispatch("getPersonalDataAction");
        this.$store.dispatch("getSystemAciton");
    },
    mounted() {
        this.getData();
        this.getArticleList();
        this.getCommentList();
    },
    methods: {
        getData() {
            this.$store.dispatch("getCountAction");
        },
        getArticleList() {
            this.$store.dispatch("getArticleListAction", this.paging);
        },
        getCommentList() {
            this.$store.dispatch("getCommentListAction", this.paging);
        }
    }
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 480px) {
    .index-top {
        h1 {
            margin-top: 0px;
        }
    }
    .index-bottom {
        section ul {
            padding-left: 0px !important;
        }
    }
} /* 超小设备（手机，小于 480px） */
.index-top {
    margin-bottom: 25px;
    padding: 0 0 35px;
    border-bottom: 2px solid #c7c7c7;
    .sign {
        font-size: 3.75rem;
        color: #ff7b00;
    }
    p a {
        margin-right: 20px;
    }
    .index-top-context {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80%;
    }
}

.index-bottom {
    display: flex;
    section {
        flex: 1;
        font-size: 0.9375rem;
        margin: 0 10px;
        overflow: hidden;
    }
    section ul {
        padding-left: 20px;
    }
    section ul li {
        margin-bottom: 5px;
    }
    section ul li span {
        vertical-align: top;
        display: inline-block;
        margin-right: 10px;
        color: #969696;
    }
}
</style>