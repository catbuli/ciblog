<template>
    <div id="app">
        <navEle v-if="$store.state.global.isAdmin"
                v-cloak></navEle>
        <adminNav v-else
                  v-cloak></adminNav>
        <div id="mian"
             :class="[$store.state.global.isShowLeftNav ? '' : 'handle-main']"
             :style="{height:$store.state.global.isAdmin?'100%':''}">
            <transition name="fade"
                        @enter="beforeEnter">
                <!-- @before-leave="beforeEnter"> -->
                <!-- mode="out-in"> -->
                <router-view :key="$store.state.global.refresh" />
                <!-- 博客 ↑ :key="$route.path" -->
            </transition>
        </div>
    </div>
</template>

<script>
import adminNav from "@/components/admin/common/adminNav.vue";
import navEle from "@/components/nav/navEle.vue";
export default {
    name: "app",
    data() {
        return {};
    },
    watch: {
        $route: function(to, from) {
            // scrollTo(0, 0);
            let router_path = to.path;
            if (router_path.indexOf("/admin") != -1) {
                this.$store.commit("isAdmin", false);
                this.$store.commit("handleLeftNav", false);
            } else if (router_path.indexOf("/login") != -1) {
                this.$store.commit("isAdmin", false);
                this.$store.commit("handleLeftNav", false);
            } else {
                this.$store.commit("isAdmin", true);
                this.$store.commit("handleLeftNav", false);
            }
        },
        "$store.state.global.isShowLeftNav": function() {}
    },
    components: {
        navEle,
        adminNav
    },
    methods: {
        checkRouter() {
            let router_path = this.$route.path;
            if (router_path.indexOf("/admin") != -1) {
                this.$store.commit("isAdmin", false);
                this.$store.commit("handleLeftNav", false);
            } else if (router_path.indexOf("/login") != -1) {
                this.$store.commit("isAdmin", false);
                this.$store.commit("handleLeftNav", false);
            } else {
                this.$store.commit("isAdmin", true);
                this.$store.commit("handleLeftNav", false);
            }
        },
        beforeEnter(el) {
            scrollTo(0, 0);
        }
    },
    mounted() {
        this.checkRouter();
    }
};
</script>

<style>
[v-cloak] {
    display: none;
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

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}

#mian {
    position: absolute;
    width: 85%;
    left: 15%;
    transition: all 0.5s ease;
}

.handle-main {
    width: 100% !important;
    left: 0 !important;
    transition: all 0.5s ease;
}

/* 路由切换动画 */
.fade-enter {
    transform: translateX(100%);
    /* transform: scale(0.3); */
    opacity: 0.3;
}
.fade-enter-active {
    transition: all 1.5s ease;
}
.fade-enter-to {
    transform: translateY(0);
    /* transform: scale(1); */
    opacity: 1;
}

.fade-leave {
    transform: translateY(0);
    /* transform: scale(1); */
    opacity: 1;
}
.fade-leave-active {
    transition: all 0.5s ease;
    /* animation: card-out 1s ease; */
}
.fade-leave-to {
    transform: translateX(-100%);
    /* transform: scale(0.3); */
    opacity: 0;
}
</style>
