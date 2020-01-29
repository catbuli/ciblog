<template>
    <adminFrame>
        <adminTitle title="个人设置">sss</adminTitle>
        <section>
            <ul>
                <li>
                    <h4>昵称</h4>
                    <el-input placeholder="请输入内容"
                              v-model="personalData.nickname"></el-input>
                    <span class="input-hint">用户昵称可以与用户名不同, 用于前台显示.
                        如果你将此项留空, 将默认使用用户名.</span>
                </li>
                <li>
                    <h4>个人主页地址</h4>
                    <el-input placeholder="请输入内容"
                              v-model="personalData.indexurl"></el-input>
                    <span class="input-hint">此用户的个人主页地址, 请用 http:// 开头.</span>
                </li>
                <li>
                    <h4>哔哩哔哩主页</h4>
                    <el-input placeholder="请输入内容"
                              v-model="personalData.bilibili"></el-input>
                    <span class="input-hint">bilibili个人主页.</span>
                </li>
                <li>
                    <h4>github主页</h4>
                    <el-input placeholder="请输入内容"
                              v-model="personalData.github"></el-input>
                    <span class="input-hint">github个人主页.</span>
                </li>
                <li>
                    <h4>电子邮箱</h4>
                    <el-input placeholder="请输入内容"
                              v-model="personalData.mail"></el-input>
                    <span class="input-hint">电子邮箱啦.</span>
                </li>
                <li class="input-button">
                    <el-button type="primary"
                               @click="submit">更新信息</el-button>
                </li>
            </ul>
        </section>
        <section id="change-password">
            <ul>
                <li>
                    <h4>密码</h4>
                    <el-input placeholder="请输入内容"></el-input>
                    <span class="input-hint">新的后台登陆密码.</span>
                </li>
                <li>
                    <h4>确认密码</h4>
                    <el-input placeholder="请输入内容"></el-input>
                    <span class="input-hint">确认你的密码.</span>
                </li>
                <li class="input-button">
                    <el-button type="primary">修改密码</el-button>
                </li>
            </ul>
        </section>
    </adminFrame>
</template>

<script>
import adminTitle from "@/components/admin/common/adminTitle.vue";
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "personalSettings",
    components: {
        adminTitle,
        adminFrame
    },
    data() {
        return {
            personalData: {}
        };
    },
    mounted() {
        this.getData();
    },
    watch: {
        "$store.state.global.personalData": function() {
            this.personalData = this.$store.state.global.personalData;
        }
    },
    methods: {
        getData() {
            this.$store.dispatch("getPersonalDataAction");
        },
        submit() {
            this.$store.dispatch("updatePersonalDataAction", this.personalData);
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
    width: 50%;
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