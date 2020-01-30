<template>
    <adminFrame title="标签管理"
                height="500px"
                width="60%">
        <el-row>
            <el-col :span="15">
                <el-tag v-for="tag in tagList"
                        :key="tag.mid"
                        @close="handleClose"
                        closable>
                    {{tag.name}}
                </el-tag>
            </el-col>
            <el-col :span="9">
                <section id="add-tag">
                    <ul>
                        <li>
                            <h4>标签名称<sup style="color:red">*</sup></h4>
                            <el-input placeholder="请输入内容"
                                      v-model="tagName"></el-input>
                            <span class="input-hint">标签名称</span>
                        </li>
                        <li class="input-button">
                            <el-button type="primary"
                                       @click="addTag">添加标签</el-button>
                        </li>
                    </ul>
                </section>
            </el-col>
        </el-row>
    </adminFrame>
</template>

<script>
import adminFrame from "@/components/admin/common/adminFrame.vue";
export default {
    name: "manageTag",
    components: {
        adminFrame
    },
    data() {
        return {
            tagList: [],
            loading: true,
            tagName: ""
        };
    },
    watch: {
        "$store.state.tag.tagList": function() {
            this.tagList = this.$store.state.tag.tagList;
            this.loading = false;
        }
    },
    mounted() {
        this.getTagList();
    },
    methods: {
        getTagList() {
            this.$store.dispatch("getTagListAction");
        },
        handleClose(tag) {
            this.tagList.splice(this.tagList.indexOf(tag), 1);
        },
        addTag() {
            this.$store.dispatch("addTagAction", this.tagName);
            this.tagName = "";
        }
    }
};
</script>

<style scoped>
.el-tag {
    font-size: 20px;
    line-height: 30px;
    margin: 10px auto;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
h4 {
    text-align: left;
    font-weight: 900;
}
li {
    width: 90%;
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
