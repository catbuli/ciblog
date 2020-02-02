<template>
    <div id="login">
        <div class="login-bg"></div>
        <div class="login-main">
            <div class="login-top">
                sss
            </div>
            <div class="login-botton">sss</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    components: {},
    data() {
        return {};
    },
    methods: {},
    mounted() {}
};
</script>

<style scoped>
#login {
    /* display: flex; */
    height: 100%;
    width: 100%;
    position: fixed;
}
.login-bg {
    z-index: -10;
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: url("../assets/images/backgroud/loginbg.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: all 1.5 ease;
    transform: scale(1.5);
    filter: blur(20px);
}
.login-main {
    z-index: 1;
    height: 20px;
    width: 48%;
    position: relative;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
}
.login-top {
    width: 100%;
    background: #e1e1e1;
    border-radius: 25px 25px 0px 0px;
}
.login-botton {
    width: 100%;
    background: #e1e1e1;
    border-radius: 0px 0px 25px 25px;
}
</style>
