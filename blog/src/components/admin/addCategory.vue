<template>
    <adminFrame title="新增分类">
        <section>
            <ul>
                <li>
                    <h4>分类名称<sup>*</sup></h4>
                    <el-input placeholder="请输入分类"></el-input>
                </li>
                <li>
                    暂无
                </li>
                <li>
                    <h4>分类描述</h4>
                    <el-input placeholder="请输入内容"
                              v-model="personalData.mail"
                              type="textarea"
                              :rows="4"></el-input>
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
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "addCategory",
    components: {
        adminFrame
    },
    data() {
        return {
            personalData: {}
        };
    },
    methods: {
        submit() {
            console.log("tag", "");
        }
    }
};
</script>

<style scoped>
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
    margin-top: 10px;
    text-align: left;
    color: rgb(255, 136, 0);
}
</style>