<template>
    <div id="admin">
        <adminNav v-show="isShow"></adminNav>
        <transition name="card">
            <router-view />
        </transition>
    </div>
</template>

<script>
import adminNav from "./components/common/adminNav.vue";
export default {
    name: "admin",
    components: {
        adminNav
    },
    data() {
        return {
            isShow: false // nav显示
        };
    },
    watch: {
        // 监听路由
        $route() {
            if (this.$store.state.global.isLogin) this.isShow = true;
        }
    },
    methods: {
        // 判断是pc还是移动端
        isPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = [
                "Android",
                "iPhone",
                "SymbianOS",
                "Windows Phone",
                "iPad",
                "iPod"
            ];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            this.$store.commit("isPC", flag);
        },
        //判断是否登陆
        isLogin() {
            if (localStorage.getItem("uid") && localStorage.getItem("token"))
                this.$store.commit("setIsLogin", true);
        },
        //删除loading组件
        removeLoading() {
            let loading = document.getElementById("loading");
            if (loading) {
                loading.remove();
            }
        }
    },
    created() {
        this.isPC();
        this.isLogin();
    },
    mounted() {
        this.removeLoading();
    }
};
</script>

<style lang="less">
/* admin框架样式 */

/* 公共样式设置 */
::selection {
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
}
/* 滚动条整体部分，可以设置宽度等 */
::-webkit-scrollbar {
    width: 10px;
    height: 7px;
}
/* 外层轨道 */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #8a8a8a;
    border-radius: 10px;
    background-color: #8a8a8a;
}
/* 内层滚动槽 */
::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8;
}
/* 滚动的滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px #8a8a8a;
    background-color: #8a8a8a;
}
::-webkit-scrollbar-thumb:hover {
    background-color: #b4b4b4;
}

[v-cloak] {
    display: none;
}
img {
    user-select: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 400;
}
html {
    height: 100%;
    width: 100%;
}
input,
button {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
}
body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    background-color: #f2f2f2;
}
a {
    text-decoration: none;
}
a:visited {
    color: #ff7b00;
    text-decoration: none;
}
a:link {
    color: #ff7b00;
}
body,
ul,
li,
p,
menu {
    margin: 0;
    padding: 0;
}
li {
    list-style: none;
}

#admin {
    width: 100%;
    height: 100%;
}

.card-enter {
    transform: translateX(-80%);
    -ms-transform: translateX(-80%);
    -moz-transform: translateX(-80%);
    -webkit-transform: translateX(-80%);
    -o-transform: translateX(-80%);
    opacity: 0.3;
}
.card-enter-active {
    transition: all 1s ease;
}
.card-enter-to {
    transform: translateX(0);
    -ms-transform: translateX(0);
    -moz-transform: translateX(0);
    -webkit-transform: translateX(0);
    -o-transform: translateX(0);
    opacity: 1;
}

.card-leave {
    transform: translateX(0);
    -ms-transform: translateX(0);
    -moz-transform: translateX(0);
    -webkit-transform: translateX(0);
    -o-transform: translateX(0);
    opacity: 1;
}
.card-leave-active {
    transition: all 1s ease;
}
.card-leave-to {
    transform: translateX(150%);
    -ms-transform: translateX(150%);
    -moz-transform: translateX(150%);
    -webkit-transform: translateX(150%);
    -o-transform: translateX(150%);
    opacity: 0.3;
}
</style>