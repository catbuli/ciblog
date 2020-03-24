<template>
    <div class="footEle">
        <p class="footer-info"
           v-if="$store.state.global.system.web_name">
            © 2020 • {{this.$store.state.global.system.web_name}} • ciblog • 0.0.2
        </p>
    </div>
</template>

<script>
export default {
    name: "footEle",
    data() {
        return {
            nickname: ""
        };
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style scoped>
.footEle {
    /* position: absolute; */
    /* bottom: 0px; */
    clear: both;
    margin: 40px auto;
    width: 100%;
    color: black;
    text-align: center;
    min-width: 730px;
}
.footEle .footer-info {
    color: rgb(104, 104, 104);
    font-size: 0.8rem;
    font-weight: 600;
}
</style>
