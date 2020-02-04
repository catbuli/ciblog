<template>
    <div id="app">
        <navEle v-if="$store.state.global.isAdmin"></navEle>
        <adminNav v-else></adminNav>
        <div id="mian"
             :class="[$store.state.global.isShowLeftNav ? '' : 'handle-main']">
            <transition name="fade"
                        mode="out-in">
                <router-view />
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
            scrollTo(0, 0);
            let router_path = to.path;
            console.log(router_path.indexOf("/admin"));
            if (router_path.indexOf("/admin") != -1) {
                this.$store.commit("isAdmin", false);
                this.$store.commit("handleLeftNav", false);
            } else if (router_path.indexOf("/login") != -1) {
                this.$store.commit("isAdmin", false);
                this.$store.commit("handleLeftNav", false);
            } else {
                this.$store.commit("isAdmin", true);
                this.$store.commit("handleLeftNav", true);
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
            console.log(router_path.indexOf("/admin"));
            if (router_path.indexOf("/admin") != -1) {
                this.$store.commit("isAdmin", false);
                this.$store.commit("handleLeftNav", false);
            } else if (router_path.indexOf("/login") != -1) {
                this.$store.commit("isAdmin", false);
                this.$store.commit("handleLeftNav", false);
            } else {
                this.$store.commit("isAdmin", true);
                this.$store.commit("handleLeftNav", true);
            }
        }
    },
    mounted() {
        this.checkRouter();
    }
};
</script>

<style>
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
.fade-enter {
    opacity: 0;
    transform: rotateY(180deg);
}

.fade-leave {
    opacity: 1;
    transform: rotateY(0deg);
}

.fade-enter-active {
    transition: all 0.9s ease;
}

.nav-enter {
    width: 0%;
}
.nav-enter-to {
    width: 100%;
}

.nav-leave {
    width: 100%;
}
.nav-leave-to {
    width: 0%;
}

.nav-enter-active {
    transition: all 0.5s ease;
}
/* .fade-leave-active {
} */
</style>
