<template>
    <div id="paging">
        <el-pagination background
                       layout="jumper,prev,pager,next,total"
                       :total="paging.total"
                       :page-size="paging.pageSize"
                       :style="{textAlign:align}"
                       @current-change="currentChange">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "paging",
    props: {
        action: String,
        align: {
            type: String,
            default: "center"
        },
        paging: {
            type: Object,
            default: {
                pageSize: 10,
                currentPage: 1,
                type: -1,
                typeName: "status",
                total: 0
            }
        }
    },
    data() {
        return {};
    },
    watch: {
        "$store.state.global.paging": function() {
            scrollTo(0, 0);
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        currentChange(e) {
            this.paging.currentPage = e;
            this.$emit("function", e);
            this.getList();
        },
        getList() {
            this.$store.dispatch(this.action, this.paging);
        }
    }
};
</script>

<style scoped>
</style>