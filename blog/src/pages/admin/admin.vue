<template>
    <div id="admin">
        <adminNav></adminNav>
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
    methods: {
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
        }
    },
    created() {
        this.isPC();
    },
    mounted() {
        let loading = document.getElementById("loading");
        loading.remove();
    }
};
</script>

<style lang="less">
/* admin框架样式 */
.admin-frame {
    position: relative;
    width: 100%;
    height: 100%;
}
.element-frame {
    margin: 0 auto;
    width: 750px;
}
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
    // position: relative;
    width: 100%;
    height: 100%;
}

.card-enter {
    transform: translateX(-80%);
    /* transform: scale(0.3); */
    opacity: 0.3;
}
.card-enter-active {
    transition: all 1s ease;
}
.card-enter-to {
    transform: translateX(0);
    /* transform: scale(1); */
    opacity: 1;
}

.card-leave {
    transform: translateX(0);
    /* transform: scale(1); */
    opacity: 1;
}
.card-leave-active {
    transition: all 1s ease;
    /* animation: card-out 1s ease; */
}
.card-leave-to {
    transform: translateX(150%);
    /* transform: scale(0.3); */
    opacity: 0.3;
}
</style>