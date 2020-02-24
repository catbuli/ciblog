<template>
    <div class="footEle">
        <p class="footer-info">
            © 2020 • {{this.$store.state.global.personalData.nickname}} • Blog • Test
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
    mounted() {},
    methods: {}
};
</script>

<style scoped>
.footEle {
    clear: both;
    margin: 20px auto;
    width: 100%;
    color: black;
    text-align: center;
    min-width: 730px;
}
.footEle .footer-info {
    color: #444;
}
</style>
