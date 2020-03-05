<template>
    <div id="QAQ">
        <el-popover placement="top-start"
                    trigger="hover"
                    v-model="visible">
            <span v-for="item in QAQlist"
                  :key="item.value"
                  :title="item.title"
                  class="item"
                  @click="select(item.value)">
                {{item.value}}
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
            visible: false,
            QAQlist: [
                { value: "QAQ", title: "第一个图标" },
                { value: "A", title: "第二个图标" },
                { value: "B", title: "第二个图标" },
                { value: "V", title: "第二个图标" },
                { value: "D", title: "第二个图标" },
                { value: "Ddd", title: "第二个图标" },
                { value: "Dddd", title: "第二个图标" },
                { value: "Ddddd", title: "第二个图标" }
            ]
        };
    },
    props: {
        input: {
            type: String,
            required: true
        }
    },
    mounted() {},
    methods: {
        select(value) {
            var input = document.getElementById(this.input);
            input.value += value;
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
}
.item + .item {
    margin-left: 5px;
}
.item:hover {
    background: rgb(202, 202, 202);
}
</style>