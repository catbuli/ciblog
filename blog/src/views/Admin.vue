<template>
    <div id="Admin">
        <adminNav></adminNav>
        <div class="admin-main">
            <router-view></router-view>
        </div>
        <footEle></footEle>
    </div>
</template>

<script>
// @ is an alias to /src
import adminNav from "@/components/admin/common/adminNav.vue";
import footEle from "@/components/footer/footEle.vue";
import Axios from "axios";

export default {
    name: "admin",
    components: {
        adminNav,
        footEle
    },
    data() {
        return {};
    },
    methods: {},
    mounted() {}
};
</script>

<style scoped>
.admin-main {
    width: 100%;
}
</style>
