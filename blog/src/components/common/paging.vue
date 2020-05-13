<template>
    <div id="paging">
        <el-pagination background
                       layout="jumper,prev,pager,next,total"
                       :total="page.total"
                       :page-size="page.pageSize"
                       :style="{textAlign:align}"
                       :hide-on-single-page="true"
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
            default: () => {
                return {
                    pageSize: 10,
                    currentPage: 1,
                    type: -1,
                    typeName: "all",
                    total: 0
                };
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

<style lang="less" scoped>
@media screen and (max-width: 480px) {
} /* 超小设备（手机，小于 480px） */

#paging /deep/ .el-pagination.is-background .el-pager li {
    transition: all 0.3s ease;
}
#paging /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #8a8a8a;
    color: #5a5e66;
}
#paging /deep/ .el-pagination.is-background .el-pager li:hover {
    color: #5a5e6677;
}
</style>