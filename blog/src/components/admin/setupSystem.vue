<template>
    <adminFrame title="系统设置">
        <section :loading="loading">
            <ul>
                <li>
                    <h4>banner图片</h4>
                    <el-input v-model="system.banner"
                              type="textarea"
                              show-word-limit
                              :rows=7></el-input>
                    <span class="input-hint">首页banner图片一行一个地址可设置多个,随机更换.</span>
                </li>
                <!-- <li>
                    <h4>主页描述</h4>
                    <el-input placeholder="请输入内容"
                              v-model="system.description"></el-input>
                    <span class="input-hint">
                        设置显示在主页以及title的描述信息.
                    </span>
                </li>
                <li>
                    <h4>个人主页地址</h4>
                    <el-input placeholder="请输入内容"
                              v-model="system.indexurl"></el-input>
                    <span class="input-hint">此用户的个人主页地址, 请用 http:// 开头.</span>
                </li>
                <li>
                    <h4>哔哩哔哩主页</h4>
                    <el-input placeholder="请输入内容"
                              v-model="system.bilibili"></el-input>
                    <span class="input-hint">bilibili个人主页.</span>
                </li>
                <li>
                    <h4>github主页</h4>
                    <el-input placeholder="请输入内容"
                              v-model="system.github"></el-input>
                    <span class="input-hint">github个人主页.</span>
                </li>
                <li>
                    <h4>电子邮箱</h4>
                    <el-input placeholder="请输入内容"
                              v-model="system.mail"></el-input>
                    <span class="input-hint">电子邮箱啦.</span>
                </li> -->
                <li class="input-button">
                    <el-button type="primary"
                               @click="submit">保存设置</el-button>
                </li>
            </ul>
        </section>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "setupSystem",
    components: {
        adminFrame
    },
    watch: {
        "$store.state.global.system": function() {
            this.system = this.$store.state.global.system;
            this.loading = false;
        }
    },
    data() {
        return {
            system: {},
            loading: true
        };
    },
    created() {
        this.$store.dispatch("getSystemAciton");
    },
    methods: {
        submit() {
            this.$store.dispatch("updateSystemAciton", this.system);
        }
    }
};
</script>

<style scoped>
section {
    padding-bottom: 20px;
}
h4 {
    text-align: left;
    font-weight: 900;
}
li {
    width: 60%;
    margin: 0 auto;
}
.input-button {
    margin: 20px auto;
    text-align: left;
}
.input-hint {
    width: 100%;
    font-size: 13px;
    display: inline-block;
    margin-top: 10px;
    text-align: left;
    color: rgb(255, 136, 0);
}
</style>