<template>
    <div id="Admin">
        <div class="admin-main">
            <router-view></router-view>
        </div>
        <footEle></footEle>
    </div>
</template>

<script>
// @ is an alias to /src

import footEle from "@/components/footer/footEle.vue";
import Axios from "axios";

export default {
    name: "admin",
    components: {
        footEle
    },
    data() {
        return {};
    },
    methods: {
        checkLogin() {
            this.$router.push("/login");
        }
    },
    mounted() {
        // this.checkLogin();
    }
};
</script>

<style scoped>
.admin-main {
    width: 100%;
}
</style>
