<template>
    <div id="paging">
        <el-pagination background
                       layout="jumper,prev,pager,next,total"
                       :total="paging.total"
                       :page-size="paging.pageSize"
                       style="text-align:right"
                       @current-change="currentChange">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "paging",
    props: {
        action: String
    },
    data() {
        return {
            paging: {
                pageSize: 10,
                currentPage: 1,
                type: -1,
                typeName: "status",
                total: 0
            }
        };
    },
    watch: {
        "$store.state.global.paging": function() {
            this.paging = this.$store.state.global.paging;
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        currentChange(e) {
            this.paging.currentPage = e;
            this.getList();
        },
        getList() {
            this.$store.dispatch(this.action, this.paging);
        }
    }
};
</script>

<style scoped>
#paging {
}
</style>