<template>
    <adminFrame title="文章管理"
                width="65%"
                action
                @refresh-click="getData">
        <el-row>
            <el-col :span="2">
                <el-button type="primary"
                           icon="el-icon-plus"
                           @click="$router.push('/admin/write_article')">
                </el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary"
                           icon="el-icon-delete"
                           @click="delArticle">
                </el-button>
            </el-col>
            <el-col :span="4">
                <el-select v-model="category"
                           clearable
                           placeholder="分类筛选"
                           @change="change"
                           @clear="clear">
                    <el-option v-for="item in categoryList"
                               :key="item.mid"
                               :label="item.name"
                               :value="item.mid">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4"
                    :offset=1>
                <el-input clearable
                          placeholder="关键字筛选"
                          v-model="keyword"
                          @keyup.enter.native="search"
                          @clear='clear'></el-input>
            </el-col>
        </el-row>
        <el-table class="article-table"
                  :highlight-current-row="true"
                  :data="articleList"
                  v-loading="loading"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             align="center">
            </el-table-column>
            <el-table-column align="center"
                             width="80px"
                             label="评论数">
                <template slot-scope="scope">
                    <el-badge :value="scope.row.comment_count"
                              class="item">
                    </el-badge>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             width="80px"
                             label="访问量">
                <template slot-scope="scope">
                    <el-badge :value="scope.row.pv"
                              class="item">
                    </el-badge>
                </template>
            </el-table-column>
            <el-table-column prop="title"
                             align="left"
                             label="标题">
                <template slot-scope="scope">
                    <span>{{scope.row.title}}</span>
                    <el-badge value="草稿"
                              type="info"
                              v-if="scope.row.status>0">
                    </el-badge>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             width="80px"
                             label="操作">
                <template slot-scope="scope">
                    <i class="el-icon-edit operating-button"
                       @click="editArticle(scope.row.aid)"
                       title="编辑"></i>
                    <a :href="`/article/${scope.row.aid}`"
                       v-if="scope.row.status<2"
                       title="查看"
                       target="_blank"
                       class="operating-button">
                        <i class="el-icon-location-outline">
                        </i>
                    </a>
                    <!-- <i class="el-icon-delete operating-button"
                       @click="delArticle(scope.row.aid)"></i> -->
                </template>
            </el-table-column>
            <el-table-column prop=""
                             align="center"
                             label="分类">
                <template slot-scope="scope">
                    <span v-for="item in scope.row.category"
                          :key="item.cid"
                          v-text="item.name"
                          class="article-table-category"></span>
                </template>
            </el-table-column>
            <el-table-column prop="create_date"
                             align="center"
                             width="170px"
                             label="发布日期">
            </el-table-column>
        </el-table>
        <paging action="getArticleListAction"
                align="right"
                :paging="paging"
                @function="handlePage"></paging>
    </adminFrame>
</template>

<script>
import adminFrame from "../components/common/adminFrame.vue";
import paging from "@/components/common/paging.vue";
export default {
    name: "manageArticle",
    components: {
        adminFrame,
        paging
    },
    data() {
        return {
            loading: true,
            selectRows: [],
            category: [],
            keyword: "",
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
        categoryList() {
            return this.$store.state.category.categoryList;
        },
        articleList() {
            return this.$store.state.article.articleList;
        }
    },
    watch: {
        "$store.state.article.articleList": function() {
            this.loading = false;
        }
    },
    created() {
        if (this.$route.query.mid) {
            this.change(parseInt(this.$route.query.mid));
            this.category = parseInt(this.$route.query.mid);
        }
    },
    methods: {
        //获取文章列表
        getData() {
            this.loading = true;
            this.$store.dispatch("getArticleListAction", this.paging);
        },
        clear() {
            this.paging.typeName = "all";
            this.paging.type = -1;
            this.$store.dispatch("getArticleListAction", this.paging);
        },
        search() {
            this.paging.typeName = "keyword";
            this.paging.type = this.keyword;
            this.$store.dispatch("getArticleListAction", this.paging);
        },
        change(value) {
            this.paging.typeName = "category";
            this.paging.type = value;
            this.$store.dispatch("getArticleListAction", this.paging);
        },
        delArticle() {
            if (this.selectRows.length > 0) {
                this.$confirm("此操作将永久删除所选文章, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch(
                            "delArticleAction",
                            this.selectRows
                        );
                        this.loading = true;
                    })
                    .catch(() => {});
            }
        },
        editArticle(aid) {
            this.$router.push({
                path: `/admin/write_article/${aid}`
            });
        },
        handleSelectionChange(rows) {
            let flag = [];
            if (rows) {
                rows.forEach(row => {
                    flag.push(row.aid);
                });
            }
            this.selectRows = flag;
        },
        handlePage() {
            this.loading = true;
        }
    }
};
</script>

<style scoped>
.article-table {
    width: 100%;
    margin: 20px auto;
}
.operating-button {
    cursor: pointer;
    font-size: 20px;
    display: inline-block;
    color: #606266;
}
.operating-button + .operating-button {
    margin-left: 10px;
}
.article-table-category + .article-table-category::before {
    content: " • ";
}
</style>
