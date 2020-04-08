<template>
    <adminFrame title="系统设置"
                action
                @refresh-click="getData">
        <section v-loading="loading">
            <ul>
                <li>
                    <h4>站点名称</h4>
                    <el-input placeholder="请输入内容"
                              @keydown.enter.native="submit"
                              v-model="system.web_name"></el-input>
                    <span class="input-hint">站点描述，用于前台显示。</span>
                </li>
                <li>
                    <h4>站点地址</h4>
                    <el-input placeholder="请输入内容"
                              @keydown.enter.native="submit"
                              v-model="system.web_url"></el-input>
                    <span class="input-hint">
                        站点地址
                    </span>
                </li>
                <li>
                    <h4>站点描述</h4>
                    <el-input placeholder="请输入内容"
                              @keydown.enter.native="submit"
                              v-model="system.web_description"></el-input>
                    <span class="input-hint">站点描述，用于前台显示</span>
                </li>
                <li>
                    <h4>banner图片</h4>
                    <el-input v-model="system.banner"
                              type="textarea"
                              show-word-limit
                              :rows=7></el-input>
                    <span class="input-hint">首页banner图片一行一个地址可设置多个,随机更换.</span>
                </li>
                <li class="input-button">
                    <el-button type="primary"
                               @click="submit">保存设置</el-button>
                </li>
            </ul>
        </section>
    </adminFrame>
</template>

<script>
import adminFrame from "../components/common/adminFrame.vue";
export default {
    name: "setupSystem",
    components: {
        adminFrame
    },
    watch: {
        "$store.state.global.system": function() {
            this.loading = false;
        }
    },
    data() {
        return {
            loading: true
        };
    },
    computed: {
        system() {
            return this.$store.state.global.system;
        }
    },
    created() {
        this.getData();
    },
    mounted() {},
    methods: {
        getData() {
            this.loading = true;
            this.$store.dispatch("getSystemAciton");
        },
        submit() {
            this.$store.dispatch("updateSystemAciton", this.system);
        }
    }
};
</script>

<style scoped>
@transition: ~"all 1s ease";
@media screen and (max-width: 960px) {
    li {
        width: 90% !important;
    }
    li /deep/ .el-input__inner {
        font-size: 2rem;
        height: 5rem;
    }
    h4 {
        font-size: 2rem;
        margin: 1.5rem auto;
    }
    .input-hint {
        font-size: 1.5rem !important;
    }
    .input-button /deep/ .el-button {
        font-size: 2rem;
        height: 5rem;
    }
} /* 超小设备（手机，小于 480px） */
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
    text-align: left;
    color: rgb(255, 136, 0);
}
</style>