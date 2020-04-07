<template>
    <div id="footEle">
        <p class="footer-info"
           v-if="$store.state.global.system.web_name">
            © 2020 • {{this.$store.state.global.system.web_name}} • ciblog • 0.2.0
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

<style lang="less" scoped>
@transition: ~"all 1s ease";
@media screen and (max-width: 960px) {
    .footer-info {
        font-size: 1.5rem !important;
    }
} /* 超小设备（手机，小于 480px） */
#footEle {
    clear: both;
    margin: 40px auto;
    width: 100%;
    color: black;
    text-align: center;
    min-width: 730px;
}
#footEle .footer-info {
    transition: @transition;
    color: rgb(104, 104, 104);
    font-size: 0.8rem;
    font-weight: 600;
}
</style>
