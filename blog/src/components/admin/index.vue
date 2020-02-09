<template>
    <adminFrame title="总览">
        <div class="index-top">
            <h1>一共篇<span class="sign">{{$store.state.global.countList.articleCount}}</span>文章,<span class="sign">{{$store.state.global.countList.categoryCount}}</span>种分类,<span class="sign">{{$store.state.global.countList.commentCount}}</span>条评论</h1>
            <p>
                <router-link to="/admin/write_article">写文章</router-link>
                <router-link to="/admin/manage_article">文章管理</router-link>
                <router-link to="/admin/personal_settings">个人设置</router-link>
                <router-link to="/admin/system_settings">系统设置</router-link>
            </p>
        </div>
        <div class="index-bottom">
            <section class="list-one">
                <h3>最新发布的文章</h3>
                <ul>
                    <li v-for="item in $store.state.article.articleList.slice(0,10)"
                        :key="item.aid"><span>{{item.create_date.split(' ')[0].split('-')[1]+'-'+item.create_date.split(' ')[0].split('-')[2]}}</span><a :href="'/article/'+item.aid">{{item.title}}</a></li>
                </ul>
            </section>
            <section class="list-two">
                <h3>最新评论</h3>
                <ul>
                    <li v-for="item in $store.state.comment.commentList.slice(0,10)"
                        :key="item.cid"><span>{{item.create_date.split(' ')[0].split('-')[1]+'-'+item.create_date.split(' ')[0].split('-')[2]}}</span><a :href="'/article/'+item.aid">{{item.content}}</a></li>
                </ul>
            </section>
            <!-- <section class="list-there">
                <h3>最新发布的文章</h3>
                <ul>
                    <li v-for="item in $store.state.article.articleList"
                        :key="item.aid"><span>{{item.create_date.split(' ')[0].split('-')[1]+'-'+item.create_date.split(' ')[0].split('-')[2]}}</span><a :href="'/article/'+item.aid">{{item.title}}</a></li>
                </ul>
            </section> -->
        </div>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "index",
    components: {
        adminFrame
    },
    data() {
        return {
            paging: {
                pageSize: 10,
                currentPage: 1,
                type: -1,
                typeName: "status",
                total: 0
            }
        };
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
            this.$store.dispatch("getArticleListAction");
        },
        getCommentList() {
            this.$store.dispatch("getCommentListAction", this.paging);
        }
    }
};
</script>

<style scoped>
.sign {
    font-size: 60px;
    color: #ff7b00;
}
.index-top {
    margin-bottom: 25px;
    padding: 0 0 35px;
    border-bottom: 2px solid #c7c7c7;
}
.index-top p a {
    margin-right: 20px;
}
.index-bottom {
    display: flex;
}
.index-bottom section {
    flex: 1;
    font-size: 15px;
    margin: 0 10px;
}
section ul li {
    margin-bottom: 5px;
}
section ul li span {
    display: inline-block;
    margin-right: 15px;
    color: #969696;
}
</style>