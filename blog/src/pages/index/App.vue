<template>
    <div id="app">
        <navEle></navEle>
        <div id="mian"
             :class="[$store.state.global.isShowLeftNav&&style.isPC ? 'handle-main' : '']">
            <transition name="fade">
                <router-view :key="$route.path" />
            </transition>
            <!-- <toolbox v-if="style.isPC"></toolbox> -->
            <backTop></backTop>
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
        //监听路由变换
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
    computed: {
        style() {
            return this.$store.getters.globalStyle;
        }
    },
    methods: {
        //检查客户端类型
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
        //控制应用加载动画
        handleLoading() {
            if (document.getElementById("loading")) {
                loading.remove();
            }
        }
    },
    created() {
        this.isPC();
        this.$store.dispatch("getPersonalDataAction");
        this.$store.dispatch("getSystemAciton");
    },
    mounted() {
        this.handleLoading();
    }
};
</script>

<style lang="less">
@media screen and (max-width: 480px) {
    .element-frame {
        width: 95% !important;
    }
} /* 超小设备（手机，小于 480px） */

/* 字体设置 */
@font-face {
    font-family: "ipix";
    src: url("../../assets/styles/font/IPix中文像素字体.ttf");
}

/* #app */
#app {
    text-align: center;
    width: 100%;
    height: 100%;
    #mian {
        height: 100%;
        position: absolute;
        width: 100%;
        left: 0;
        transition: all 0.5s ease;
    }
    .handle-main {
        width: 83% !important;
        left: 17% !important;
        transition: all 0.5s ease;
    }
}

/* 框架样式 */
.index-frame {
    position: relative;
    width: 100%;
    height: 100%;
}
.element-frame {
    margin: 0 auto;
    width: 800px;
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
textarea,
button,
span,
i,
a,
div {
    font-family: BlinkMacSystemFont, "Microsoft YaHei", "Segoe UI", Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
}
input,
textarea,
button {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
}
body {
    font-family: BlinkMacSystemFont, "Microsoft YaHei", "Segoe UI", Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
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

/* 选中样式 */
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

/* 路由切换动画 */
.fade-enter {
    transform: translateY(100%);
    -ms-transform: translateY(100%);
    -moz-transform: translateY(100%);
    -webkit-transform: translateY(100%);
    -o-transform: translateY(100%);
}
.fade-enter-active {
    transition: all 1s ease;
}
.fade-enter-to {
    transform: translateY(0);
    -ms-transform: translateY(0);
    -moz-transform: translateY(0);
    -webkit-transform: translateY(0);
    -o-transform: translateY(0);
}

.fade-leave {
    transform: translateY(0);
    -ms-transform: translateY(0);
    -moz-transform: translateY(0);
    -webkit-transform: translateY(0);
    -o-transform: translateY(0);
    opacity: 1;
}
.fade-leave-active {
    transition: all 0.7s ease;
}
.fade-leave-to {
    transform: translateY(-150%);
    -ms-transform: translateY(-150%);
    -moz-transform: translateY(-150%);
    -webkit-transform: translateY(-150%);
    -o-transform: translateY(-150%);
    opacity: 0;
}
</style>
