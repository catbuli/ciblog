<template>
    <adminFrame title="个人设置"
                v-loading="loading"
                element-loading-text="数据获取中">
        <section>
            <ul>
                <li>
                    <el-avatar shape="square"
                               :size="100"
                               style="margin-bottom:20px"
                               :src="imgurl"
                               :key="imgurl"></el-avatar>
                    <!-- 博客↑ :key -->
                    <el-input placeholder="请输入内容"
                              v-model="personalData.imgurl"></el-input>
                    <span class="input-hint">头像链接地址。</span>
                </li>
                <li>
                    <h4>昵称</h4>
                    <el-input placeholder="请输入内容"
                              v-model="personalData.nickname"></el-input>
                    <span class="input-hint">用户昵称可以与用户名不同, 用于前台显示.
                        如果你将此项留空, 将默认使用用户名.</span>
                </li>
                <li>
                    <h4>个人描述</h4>
                    <el-input placeholder="请输入内容"
                              v-model="personalData.description"></el-input>
                    <span class="input-hint">
                        用于前台显示。
                    </span>
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
                    <el-input placeholder="请输入内容"
                              v-model="password"
                              ref="password"></el-input>
                    <span class="input-hint">新的后台登陆密码.</span>
                </li>
                <li>
                    <h4>确认密码</h4>
                    <el-input placeholder="请输入内容"
                              v-model="repassword"
                              ref="repassword"></el-input>
                    <span class="input-hint">确认你的密码.</span>
                </li>
                <li class="input-button">
                    <el-button type="primary"
                               @click="alterPass">修改密码</el-button>
                </li>
            </ul>
        </section>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "setupPersonal",
    components: {
        adminFrame
    },
    data() {
        return {
            loading: true,
            password: "",
            repassword: "",
            imgurl: this.$store.state.global.personalData.imgurl
        };
    },
    computed: {
        personalData() {
            return this.$store.state.global.personalData;
        }
    },
    mounted() {
        this.getData();
    },
    watch: {
        "$store.state.global.personalData": function() {
            this.loading = false;
            this.imgurl = this.$store.state.global.personalData.imgurl;
        }
    },
    methods: {
        getData() {
            this.$store.dispatch("getPersonalDataAction");
        },
        submit() {
            this.$store.dispatch("updatePersonalDataAction", this.personalData);
        },
        alterPass() {
            let password = this.$refs.password;
            let repassword = this.$refs.repassword;
            if (password.value && repassword.value) {
                if (password.value !== repassword.value) {
                    this.$notify({
                        title: "修改失败",
                        message: "两次密码输入不一致",
                        type: "error"
                    });
                } else {
                    this.$store.dispatch("alterPassAction", {
                        password: this.password,
                        repassword: this.repassword
                    });
                    this.password = "";
                    this.repassword = "";
                }
            } else {
                this.$notify({
                    title: "修改失败",
                    message: "密码或重复密码不能为空！",
                    type: "error"
                });
            }
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
    text-align: left;
    color: rgb(255, 136, 0);
}
</style>