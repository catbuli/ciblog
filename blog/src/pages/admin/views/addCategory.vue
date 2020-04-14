<template>
    <adminFrame title="新增分类">
        <section>
            <ul>
                <li>
                    <h4>分类名称<sup>*</sup></h4>
                    <el-input placeholder="请输入分类"
                              v-model="name"></el-input>
                </li>
                <li>
                </li>
                <li>
                    <h4>分类描述</h4>
                    <el-input v-model="description"
                              resize="none"
                              type="textarea"
                              placeholder="分类描述!"
                              maxlength="100"
                              show-word-limit
                              :rows=3></el-input>
                    <span class="input-hint">用来描述分类。</span>
                </li>
                <li class="input-button">
                    <el-button type="primary"
                               @click="submit">添加分类</el-button>
                </li>
            </ul>
        </section>
    </adminFrame>
</template>

<script>
import adminFrame from "../components/common/adminFrame";
export default {
    name: "addCategory",
    components: {
        adminFrame
    },
    data() {
        return {
            name: "",
            description: ""
        };
    },
    methods: {
        submit() {
            if (this.name) {
                this.$store.dispatch("addCategoryAction", {
                    name: this.name,
                    description: this.description
                });
            } else {
                this.$notify({
                    title: "失败",
                    message: "分类名不能为空",
                    type: "error",
                    offset: 50
                });
            }
        }
    }
};
</script>

<style scoped>
@media screen and (max-width: 480px) {
    li {
        width: 90% !important;
    }
} /* 超小设备（手机，小于 480px） */

sup {
    color: red;
}
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