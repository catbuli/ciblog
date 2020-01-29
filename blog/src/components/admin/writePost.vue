<template>
    <adminFrame>
        <adminTitle title="写文章"></adminTitle>
        <section class="content-main">
            <el-input placeholder="标题"></el-input>
            <span class="input-hint">这是标题</span>
            <mavonEditor class="markdown"
                         @change="change"
                         v-model="content"></mavonEditor>
        </section>
        <section class="content-settings">
            <el-row class="setting-row">
                <h3 class="setting-title">设置</h3>
            </el-row>
            <el-row class="setting-row">
                <el-col :span='12'>
                    <ul>
                        <li>
                            <el-col :span='6'>
                                <p>文章预览字段</p>
                            </el-col>
                            <el-col :span='18'>
                                <el-input placeholder="请输入内容"></el-input>
                                <span class="input-hint">确认你的密码.</span>
                            </el-col>
                        </li>
                        <li>
                            <el-col :span='6'>
                                <p>文章预览字段</p>
                            </el-col>
                            <el-col :span='18'>
                                <el-input placeholder="请输入内容"></el-input>
                                <span class="input-hint">确认你的密码.</span>
                            </el-col>
                        </li>
                        <li class="input-button">
                            <el-button type="primary"
                                       @click="submit">发布</el-button>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </section>
    </adminFrame>
</template>

<script>
import adminTitle from "@/components/admin/common/adminTitle.vue";
import adminFrame from "@/components/admin/common/adminFrame.vue";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
    name: "writePost",
    components: {
        adminTitle,
        adminFrame,
        mavonEditor
    },
    data() {
        return {
            html: "",
            content: ""
        };
    },
    mounted() {},
    watch: {},
    methods: {
        getData() {
            this.$http
                .post("/api/api/client/personal")
                .then(res => {
                    this.personalData = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        change(value, render) {
            this.html = render;
        },
        // 提交
        submit() {
            console.log(this.content);
            console.log(this.html);
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
ul {
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
.markdown {
    max-height: 800px;
}
.content-settings {
    background: white;
}
.setting-row {
    border-bottom: 1px solid #a0a0a0;
}
.setting-row .setting-title {
    text-align: left;
    margin-top: 0px;
}
</style>