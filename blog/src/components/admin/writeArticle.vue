<template>
    <adminFrame v-loading="loading"
                element-loading-text="数据获取中">
        <adminTitle v-if="isEdit"
                    :title="'编辑文章　'+showTitle"></adminTitle>
        <adminTitle v-else
                    title="写文章"></adminTitle>
        <section class="content-main">
            <el-input placeholder="标题"
                      v-model="article.title"></el-input>
            <p class="input-hint"></p>
            <div class="markdown">
                <mavonEditor @change="change"
                             v-model="article.text"></mavonEditor>
            </div>
        </section>
        <section class="content-settings">
            <el-row class="setting-row">
                <h3 class="setting-title">设置</h3>
            </el-row>
            <el-row class="setting-row">
                <el-col :span='12'>
                    <h4>文章分类</h4>
                    <el-checkbox-group v-model="article.categoryList">
                        <el-checkbox v-for="item in $store.state.category.categoryList"
                                     :key="item.mid"
                                     :label="item.mid"
                                     border>{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span='12'>
                    <h4>发布日期</h4>
                    <el-date-picker v-model="article.create_date"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    align="right"
                                    value-format="yyyy-MM-dd HH:ss:mm"
                                    :picker-options="pickerOptions">
                    </el-date-picker>
                    <h4 style="margin-top:20px">封面链接</h4>
                    <el-input placeholder="封面链接"
                              v-model="article.cover_url"></el-input>
                </el-col>
            </el-row>
            <el-row class="setting-row">
                <el-col :span='12'>
                    <h4>文章标签</h4>
                    <el-checkbox-group v-model="article.tagList">
                        <el-checkbox v-for="item in $store.state.tag.tagList"
                                     :key="item.mid"
                                     :label="item.mid"
                                     border>{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                    <el-input placeholder="新标签"
                              v-model="tagName"
                              class="new-tag"
                              @keyup.enter.native="newTag"></el-input>
                </el-col>
                <el-col :span='12'>
                    <h4>是否允许评论</h4>
                    <el-switch v-model="article.allow_comment">
                    </el-switch>
                </el-col>
            </el-row>
            <el-row class="setting-row">
                <el-col :span='12'>
                    <upload :aid=Number(this.$route.params.aid)></upload>
                </el-col>
            </el-row>
            <el-row class="setting-row">
                <el-button type="primary"
                           v-if="isEdit"
                           @click="edit">发布</el-button>
                <el-button type="primary"
                           v-else
                           @click="add">发布</el-button>
            </el-row>
        </section>
    </adminFrame>
</template>

<script>
import adminTitle from "@/components/admin/common/adminTitle.vue";
import adminFrame from "@/components/admin/common/adminFrame.vue";
import upload from "@/components/admin/common/upload.vue";
import { post } from "@/http";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
    name: "writePost",
    components: {
        adminTitle,
        adminFrame,
        mavonEditor,
        upload
    },
    data() {
        return {
            article: {
                id: null,
                categoryList: [],
                tagList: [],
                html: "",
                text: "",
                cover_url: "",
                create_date: "",
                title: "",
                allow_comment: true,
                description: ""
            },
            showTitle: "",
            loading: true,
            isEdit: false,
            tagName: "",
            pickerOptions: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        }
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        }
                    }
                ]
            }
        };
    },
    mounted() {
        this.checkEdit();
        this.getCategoryList();
        this.getTagList();
    },
    watch: {
        "$store.state.article.article": function() {
            this.article = this.$store.state.article.article;
            this.showTitle = this.$store.state.article.article.title;
            this.loading = false;
        }
    },
    methods: {
        getCategoryList() {
            this.$store.dispatch("getCategoryListAction");
        },
        getTagList() {
            this.$store.dispatch("getTagListAction");
        },
        checkEdit() {
            if (Number(this.$route.params.aid)) {
                this.isEdit = true;
                this.getArticleData(this.$route.params.aid);
            } else {
                this.isEdit = false;
                this.loading = false;
            }
        },
        getArticleData(aid) {
            if (this.isEdit) {
                this.$store.dispatch("getArticleDataAction", aid);
            }
        },
        change(value, render) {
            var reg = /[\\\`\*\_\[\]\#\+\-\!\>\=\:\~]/g;
            var description = value.replace(reg, "");
            this.article.description = description.substring(0, 100);
            this.article.html = render;
        },
        add() {
            this.article.fileList = this.$store.state.file.fileList;
            this.$store.dispatch("addArticleAction", this.article);
        },
        edit() {
            this.$store.dispatch("editArticleAction", this.article);
        },
        newTag() {
            this.$store.dispatch("addTagAction", this.tagName);
            this.tagName = "";
        }
    }
};
</script>

<style scoped>
section {
    margin-bottom: 30px;
    padding: 20px;
}
.content-main {
    padding: 0;
}
h4 {
    margin-top: 0px;
}
li {
    display: block;
    clear: both;
    margin: 15px auto;
}
.input-button {
    margin: 20px auto;
    text-align: left;
}
.input-hint {
    width: 100%;
    font-size: 13px;
    display: inline-block;
    margin: 10px auto;
    text-align: left;
    color: rgb(255, 136, 0);
}
.content-settings {
    background: white;
}
.setting-row {
    border-bottom: 1px solid #dfdfdf;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.setting-row .setting-title {
    text-align: left;
    margin: 0px;
}
.markdown {
    /* max-height: 700px; */
    overflow-x: scroll;
    overflow: auto;
}
.el-checkbox {
    margin: 0 10px 10px 0;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0px;
}
.new-tag {
    width: 150px;
}
</style>