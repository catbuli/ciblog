<template>
    <div id="login">
        <div class="login-bg"></div>
        <div class="login-main"
             ref="login">
            <div class="login-top">
                <input type="text"
                       placeholder="name"
                       v-model="username"
                       name="username">
                <input type="password"
                       placeholder="password"
                       name="password"
                       v-model="password"
                       @keydown.enter="login">
            </div>
            <div class="login-botton"
                 @click="login">
                <h3>Login</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    components: {},
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        login() {
            var login = this.$refs.login;
            login.addEventListener("animationend", function() {
                login.style = "";
                console.log("删除style");
            });
            login.style.animation = "error 0.8s ease 0s 1";
        }
    },
    mounted() {}
};
</script>

<style>
#login {
    /* display: flex; */
    height: 100%;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;
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
    /* animation: error 0.8s ease 0s 1; */
}
.login-top {
    background: #e1e1e1;
    padding: 40px 60px;
    border-radius: 25px 25px 0px 0px;
}
.login-botton {
    padding: 20px 60px;
    background: #e15748;
    border-radius: 0px 0px 25px 25px;
    border-top: 2px solid #ad4337;
    cursor: pointer;
}
.login-button:hover {
}
@keyframes error {
    0% {
        transform: translateX(0px);
    }
    25% {
        transform: translateX(5px);
    }
    50% {
        transform: translateX(-5px);
    }
    75% {
        transform: translateX(5px);
    }
    100% {
        transform: translateX(0px);
    }
}
.login-botton h3 {
    text-align: right;
    color: #ffffff;
    font-size: 35px;
    margin: 10px auto;
    user-select: none;
}

.login-top input {
    text-align: center;
    display: block;
    outline: none;
    font-size: 25px;
    font-weight: 500;
    color: #000000;
    padding: 15px 20px;
    background: #cacaca;
    border: 1px solid #ccc;
    border-radius: 25px;
    margin: 0px 0px 12px 0px;
    /* width: 60%; */
}
</style>
