<template>
    <div id="footEle"
         v-if="$store.state.global.system.web_name">
        <p class="footer-info">
            © 2020 • {{this.$store.state.global.system.web_name}} • ciblog • 0.4.0
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
@media screen and (max-width: 480) {
} /* 超小设备（手机，小于 480px） */
#footEle {
    clear: both;
    margin: 40px auto;
    width: 100%;
    color: black;
    text-align: center;
}
#footEle .footer-info {
    transition: @transition;
    color: rgb(104, 104, 104);
    font-size: 0.8rem;
    font-weight: 600;
}
</style>
