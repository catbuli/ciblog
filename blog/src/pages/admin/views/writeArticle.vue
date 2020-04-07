<template>
    <adminFrame v-loading="loading"
                width='75%'
                :title="title"
                element-loading-text="数据获取中">
        <!-- <adminTitle v-if="isEdit"
                    :title="'编辑文章　'+showTitle"></adminTitle>
        <adminTitle v-else
                    title="写文章"></adminTitle> -->
        <el-row>
            <el-col :span="style.writeArticle.left.span">
                <section class="content-main">
                    <el-input placeholder="标题"
                              v-model="article.title"></el-input>
                    <p class="input-hint"></p>
                    <div class="markdown">
                        <mavonEditor v-model="article.text"
                                     :toolbars="markdownOption"
                                     ref="md"
                                     @change="change"
                                     @save="saveDraft"></mavonEditor>
                    </div>
                </section>
                <section class="content-settings">
                    <el-row class="setting-row">
                        <h3 class="setting-title">设置</h3>
                    </el-row>
                    <el-row class="setting-row">
                        <el-col :span='12'>
                            <h4>发布日期</h4>
                            <el-date-picker v-model="article.create_date"
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            align="right"
                                            value-format="yyyy-MM-dd HH:ss:mm"
                                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-col>
                        <el-col :span='12'>
                            <h4>封面链接</h4>
                            <el-input placeholder="封面链接"
                                      v-model="article.cover_url"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="setting-row">
                        <el-col :span='12'>
                            <h4>是否允许评论</h4>
                            <el-switch v-model="article.allow_comment">
                            </el-switch>
                        </el-col>
                    </el-row>
                    <el-row class="setting-row">
                        <el-button type="primary"
                                   @click="publish">发布</el-button>
                        <el-button type="info"
                                   @click="saveDraft">保存草稿</el-button>
                    </el-row>
                </section>
            </el-col>
            <el-col :span="style.writeArticle.right.span"
                    :offset="style.writeArticle.right.offset">
                <section class="content-settings">
                    <el-row class="setting-row">
                        <el-col :span="style.isPC?24:12">
                            <h4>文章分类</h4>
                            <!-- <el-checkbox-group v-model="article.categoryList">
                            <el-checkbox v-for="item in categoryList"
                                         :key="item.mid"
                                         :label="item.mid"
                                         border>{{item.name}}</el-checkbox>
                        </el-checkbox-group> -->
                            <el-tree :props="props"
                                     :data="categoryList"
                                     node-key="mid"
                                     show-checkbox
                                     ref="tree"
                                     @check="check">
                            </el-tree>
                        </el-col>
                        <el-col v-if="!style.isPC"
                                :span="12">
                            <h4>文章标签</h4>
                            <el-checkbox-group v-model="article.tagList">
                                <el-checkbox v-for="item in $store.state.tag.tagList"
                                             size="small"
                                             :key="item.mid"
                                             :label="item.mid"
                                             border>{{item.name}}</el-checkbox>
                                <el-input placeholder="新标签"
                                          v-model="tagName"
                                          size="small"
                                          class="new-tag"
                                          clearable
                                          @keyup.enter.native="newTag"></el-input>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row class="setting-row"
                            v-if="style.isPC">
                        <el-col>
                            <h4>文章标签</h4>
                            <el-checkbox-group v-model="article.tagList">
                                <el-checkbox v-for="item in $store.state.tag.tagList"
                                             size="small"
                                             :key="item.mid"
                                             :label="item.mid"
                                             border>{{item.name}}</el-checkbox>
                                <el-input placeholder="新标签"
                                          v-model="tagName"
                                          size="small"
                                          class="new-tag"
                                          clearable
                                          @keyup.enter.native="newTag"></el-input>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row class="setting-row">
                        <upload :aid=Number(this.$route.params.aid)></upload>
                    </el-row>
                </section>
            </el-col>
        </el-row>
    </adminFrame>
</template>

<script>
import adminTitle from "../components/common/adminTitle.vue";
import adminFrame from "../components/common/adminFrame.vue";
import upload from "../components/common/upload.vue";
import { post } from "@/lib/http";
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
            markdownOption: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: false, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true // 预览
            },
            article: {
                aid: null,
                categoryList: [],
                tagList: [],
                html: "",
                text: "",
                cover_url: "",
                create_date: "",
                title: "",
                allow_comment: true,
                description: "",
                status: 0
            },
            props: {
                label: "name",
                children: "zones"
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
    watch: {
        "$store.state.article.article": function() {
            this.article = this.$store.state.article.article;
            this.showTitle = this.$store.state.article.article.title;
            this.loading = false;
            this.setCheckedKeys(this.article);
        }
    },
    computed: {
        style() {
            return this.$store.getters.globalStyle;
        },
        categoryList() {
            return this.$store.state.category.categoryList;
        },
        title() {
            if (this.isEdit) {
                return "编辑文章　" + this.showTitle;
            } else {
                return "写文章";
            }
        }
    },
    mounted() {
        this.checkEdit();
        this.getMetaList();
    },
    methods: {
        //设置当前已经被勾选的数组
        setCheckedKeys(data) {
            this.$refs.tree.setCheckedKeys(data.categoryList);
        },
        //根据当前选择修改分类数据
        check(data, list) {
            this.article.categoryList = list.checkedKeys;
        },
        getMetaList() {
            this.$store.dispatch("getCategoryListAction");
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
        publish() {
            this.article.fileList = this.$store.state.file.fileList;
            if (!this.article.cover_url) {
                this.article.cover_url = this.$store.state.global.system.randomBanner;
            }
            if (this.article.categoryList.length == 0) {
                this.article.categoryList = [
                    this.$store.state.category.categoryList[0].mid
                ];
            }
            if (!this.article.title) {
                scrollTo(0, 0);
                this.$notify({
                    title: "错误",
                    message: "标题不能为空",
                    type: "error",
                    offset: 50
                });
            } else {
                // console.log(this.article);
                this.$store.dispatch("publishArticleAction", this.article);
            }
        },
        newTag() {
            this.$store.dispatch("addTagAction", this.tagName);
            this.tagName = "";
        },
        saveDraft() {
            if (!this.article.title) {
                this.article.title = "未命名文章";
            }
            this.$store.dispatch("draftAction", this.article);
        }
        // imgAdd(filename, file) {
        //     let fd = new FormData();
        //     fd.append("file", file);
        //     if (this.$route.params.aid) {
        //         fd.append("aid", this.$route.params.aid);
        //         post("/upload/add", fd, data => {
        //             this.fileList.push(data.data.file);
        //         });
        //     } else {
        //         post("/upload/add", fd, data => {
        //             this.$refs.md.$img2Url(
        //                 filename,
        //                 process.env.VUE_APP_UPLOADPATH + data.data.file.url
        //             );
        //         });
        //     }
        // },
        // imgDel(filename, file) {
        //     console.log("imgDel", "");
        // }
    }
};
</script>

<style lang="less" scoped>
@transition: ~"all 1s ease";
@media screen and (max-width: 960px) {
} /* 超小设备（手机，小于 480px） */

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
    max-height: 700px;
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
    width: 100px;
    vertical-align: top;
    display: inline-block;
}
</style>