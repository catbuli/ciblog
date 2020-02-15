<template>
    <div id="paging">
        <el-pagination background
                       layout="jumper,prev,pager,next,total"
                       :total="page.total"
                       :page-size="page.pageSize"
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
                typeName: "all",
                total: 0
            }
        }
    },
    data() {
        return {
            page: this.paging
        };
    },
    watch: {
        "$store.state.global.paging": function() {
            this.page = this.$store.state.global.paging;
            scrollTo(0, 0);
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        currentChange(e) {
            this.page.currentPage = e;
            this.$emit("function", e);
            this.getList();
        },
        getList() {
            this.$store.dispatch(this.action, this.page);
        }
    }
};
</script>

<style scoped>
</style>