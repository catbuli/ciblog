<template>
    <adminFrame title="评论设置">
        <section :loading="loading">
            <ul>
                <li>
                    <h4>所有的评论都需要审核</h4>
                    <el-switch v-model="system.comment_check">
                    </el-switch>
                </li>
                <li>
                    <h4>QAQ颜文字设置</h4>
                    <el-input v-model="system.qaq"
                              type="textarea"
                              show-word-limit
                              @keydown.enter.native="submit"
                              :rows=7></el-input>
                    <span class="input-hint">颜文字表情,'%'分隔.</span>
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
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "setupComment",
    components: {
        adminFrame
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        system() {
            return this.$store.state.global.system;
        }
    },
    created() {
        this.$store.dispatch("getSystemAciton");
    },
    mounted() {},
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
    text-align: left;
    color: rgb(255, 136, 0);
}
</style>