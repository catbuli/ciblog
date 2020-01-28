<template>
    <div id="Admin">
    </div>
</template>

<script>
// @ is an alias to /src
import footEle from "@/components/footer/footEle.vue";
import headEle from "@/components/header/headEle.vue";
import backTop from "@/components/common/backTop.vue";
import Axios from "axios";

export default {
    name: "home",
    components: {
        headEle,
        footEle,
        backTop
    },
    data() {
        return {};
    },
    methods: {},
    mounted() {}
};
</script>

<style scoped>
</style>
