<template>
    <div id="app">
        <navEle v-if="$store.state.global.isAdmin"
                v-cloak></navEle>
        <div id="mian"
             :class="[$store.state.global.isShowLeftNav ? '' : 'handle-main']"
             :style="{height:$store.state.global.isAdmin?'100%':''}">
            <transition name="fade">
                <!-- @leave="leave" -->
                <!-- mode="out-in"> -->
                <router-view :key="$route.fullPath" />
                <!-- 博客 ↑ :key="$route.path" -->
            </transition>
            <toolbox v-if="$store.state.global.isAdmin"></toolbox>
            <backTop></backTop>
            <!--  -->
        </div>
    </div>
</template>

<script>
import backTop from "@/components/common/backTop.vue";
import navEle from "./components/navEle";
import toolbox from "@/components/miniTools/toolbox.vue";
export default {
    name: "app",
    data() {
        return {};
    },
    watch: {
        $route() {
            this.$store.commit("handleLeftNav", false);
            scrollTo(0, 0);
        }
    },
    components: {
        navEle,
        toolbox,
        backTop
    },
    methods: {
        beforeEnter(el) {
            scrollTo(0, 0);
        },
        enter(el, done) {
            if (this.$route.fullPath == "/" || this.$route.fullPath == "/log") {
                done();
            }
        },
        leave(el, done) {
            if (this.$route.fullPath == "/" || this.$route.fullPath == "/log") {
                done();
            }
        },
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
        handleLoading() {
            let loading = document.getElementById("loading");
            if (loading) {
                loading.remove();
            }
        }
    },
    created() {
        this.$store.dispatch("getPersonalDataAction");
        this.$store.dispatch("getSystemAciton");
    },
    mounted() {
        this.isPC();
        this.handleLoading();
    }
};
</script>

<style>
/* 鼠标样式 */
body {
    /* cursor: url("../../assets/images/cursor/Hand.png") auto; */
}
/* index框架样式 */
.index-frame {
    position: relative;
    width: 100%;
    height: 100%;
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
    color: #333;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
a {
    color: #333;
    text-decoration: none;
    transition: all 0.24s ease;
}
a:visited {
    text-decoration: none;
}
a:hover {
    color: #8a8a8a !important;
}
.link {
    cursor: pointer;
    color: #333;
    text-decoration: none;
    transition: all 0.24s ease;
}
.link:hover {
    color: #8a8a8a !important;
}
.text-shadow {
    color: rgba(0, 0, 0, 0.6);
    text-shadow: 0 0 5px #b2b2b2;
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

#app {
    text-align: center;
    width: 100%;
    height: 100%;
}

#mian {
    position: absolute;
    width: 80%;
    left: 20%;
    transition: all 0.5s ease;
}

.handle-main {
    width: 100% !important;
    left: 0 !important;
    transition: all 0.5s ease;
}

/* 路由切换动画 */
.fade-enter {
    transform: translateY(100%);
    /* transform: scale(0.3); */
    /* opacity: 0; */
}
.fade-enter-active {
    transition: all 1s ease;
}
.fade-enter-to {
    transform: translateY(0);
    /* transform: scale(1); */
    /* opacity: 1; */
}

.fade-leave {
    transform: translateY(0);
    /* transform: scale(1); */
    opacity: 1;
}
.fade-leave-active {
    transition: all 0.7s ease;
    /* animation: card-out 1s ease; */
}
.fade-leave-to {
    transform: translateY(-150%);
    /* transform: scale(0.3); */
    opacity: 0;
}
/* 路由切换动画 */
/* .fade-enter {
    transform: translateX(100%);
    opacity: 0.3;
}
.fade-enter-active {
    transition: all 1.5s ease;
}
.fade-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.fade-leave {
    transform: translateX(0);
    opacity: 1;
}
.fade-leave-active {
    transition: all 0.5s ease;
}
.fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
} */
</style>
