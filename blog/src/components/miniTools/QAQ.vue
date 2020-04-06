<template>
    <div id="QAQ">
        <el-popover placement="top-start"
                    trigger="hover"
                    width=500
                    v-model="visible">
            <span v-for="item in QAQlist"
                  :key="item"
                  :title="item"
                  class="item"
                  @click="select(item)">
                {{item}}
            </span>
            <el-button slot="reference">QAQ</el-button>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: "QAQ",
    data() {
        return {
            visible: false
        };
    },
    props: {
        input: {
            type: String,
            required: true
        }
    },
    computed: {
        QAQlist() {
            var QAQlist = this.$store.state.global.system.qaq;
            if (QAQlist) {
                return QAQlist.split("%");
            } else {
                return "正在获取颜文字列表";
            }
        }
    },
    mounted() {},
    methods: {
        select(value) {
            var input = document.getElementById(this.input);
            input.value += value;
            this.visible = false;
        }
    }
};
</script>

<style scoped>
#QAQ {
}
.item {
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    user-select: none;
    margin-bottom: 5px;
    display: inline-block;
}
.item + .item {
    margin-left: 5px;
}
.item:hover {
    background: rgb(202, 202, 202);
}
</style>